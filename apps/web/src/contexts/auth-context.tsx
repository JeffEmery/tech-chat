// contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { PublicClientApplication, AuthenticationResult, AccountInfo, InteractionStatus, InteractionRequiredAuthError, LogLevel } from "@azure/msal-browser";
import { MsalProvider, useIsAuthenticated, useMsal } from "@azure/msal-react";

const clientId = import.meta.env.VITE_ENTRA_CLIENT_ID;
const tenantId = import.meta.env.VITE_ENTRA_TENANT_ID;
const redirectUri = import.meta.env.VITE_ENTRA_REDIRECT_URI;
const scopes = import.meta.env.VITE_ENTRA_SCOPES || "User.Read";
const scopesArray = scopes.split(",");

const msalConfig = {
  auth: {
    clientId: clientId, // This is the ONLY mandatory field that you need to supply.
    authority: `https://login.microsoftonline.com/${tenantId}`, // Replace the placeholder with your tenant info
    redirectUri: redirectUri, // Points to window.location.origin. You must register this URI on Microsoft Entra admin center/App Registration.
    postLogoutRedirectUri: "/", // Indicates the page to navigate after logout.
    navigateToLoginRequestUrl: false, // If "true", will navigate back to the original request location before processing the auth code response.
  },
  cache: {
    cacheLocation: "localStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          // case LogLevel.Info:
          //   console.info(message);
          //   return;
          // case LogLevel.Verbose:
          //   console.debug(message);
          //   return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
    loggerLevel: LogLevel.Warning,
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
  scopes: scopesArray,
};

/**
 * An optional silentRequest object can be used to achieve silent SSO
 * between applications by providing a "login_hint" property.
 */
export const silentRequest = {
  scopes: scopesArray,
  // loginHint: "example@domain.net",
};

const apiRequest = {
  scopes: [`api://${clientId}/access_as_user`],
};

interface AuthContextType {
  account: AccountInfo | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  getAccessToken: (scopes?: string[]) => Promise<string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const { instance, accounts, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [isLoading, setIsLoading] = useState(true);
  const account = accounts[0] || null;

  useEffect(() => {
    if (account && !instance.getActiveAccount()) {
      instance.setActiveAccount(account);
    }

    if (inProgress === InteractionStatus.None) {
      setIsLoading(false);
    }
  }, [account, instance, inProgress]);

  const login = async (): Promise<void> => {
    try {
      await instance.loginRedirect(loginRequest);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await instance.logoutRedirect({
        account: instance.getActiveAccount(),
        onRedirectNavigate: () => {
          return false; // session logout only, do not navigation to Microsoft logout
        }
      });
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  // Get access token silently (with fallback to interactive)
  const getAccessToken = async (scopes?: string[]): Promise<string> => {
    const activeAccount = instance.getActiveAccount();

    if (!activeAccount) {
      throw new Error('No active account. User must login first.');
    }

    const request = {
      scopes: scopes || apiRequest.scopes,
      account: activeAccount,
    };

    try {
      // Try to acquire token silently
      const response: AuthenticationResult = await instance.acquireTokenSilent(request);
      return response.accessToken;
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        // If silent acquisition fails, fall back to interactive method
        try {
          await instance.acquireTokenRedirect(request);
          // const response: AuthenticationResult = await instance.acquireTokenRedirect(request);
          // return response.accessToken;
        } catch (interactiveError) {
          console.error('Interactive token acquisition failed:', interactiveError);
          throw interactiveError;
        }
      }
      console.error('Token acquisition failed:', error);
      throw error;
    }
  };

  const value = useMemo<AuthContextType>(
    () => ({
      account,
      isAuthenticated,
      isLoading,
      login,
      logout,
      getAccessToken,
    }),
    [account, isAuthenticated, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
  return (
    <MsalProvider instance={msalInstance}>
      <AuthContextProvider>{children}</AuthContextProvider>
    </MsalProvider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Export MSAL instance for advanced usage if needed
// export { msalInstance };
