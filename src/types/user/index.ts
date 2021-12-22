type UserRoles = "roles" | "offline_access" | "uma_authorization";
type UserAccountAccess = "manage-account" | "manage-account-links" | "view-profile";

export interface KeycloakUser {
  family_name: string;
  given_name: string;
  name: string;
  jti: string;
  nonce: string;
  preferred_username: string;
  session_state: string;
  sub: string;
  realm_access: {
    roles: UserRoles[];
  };
  resource_access: {
    account: UserAccountAccess[];
  };
}
