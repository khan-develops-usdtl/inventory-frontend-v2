export interface IProfile {
  dn: string
  userPrincipalName: string;
  sAMAccountName: string;
  whenCreated: string;
  pwdLastSet: string;
  userAccountControl: string;
  sn: string;
  givenName: string;
  initials: string;
  cn: string;
  displayName: string;
  description: string;
}