export const TITLES = {
  PROJECT_NAME: 'UI',
  LOGIN: 'Login',
  DASHBOARD: 'Dashboard',
  PROFILE: 'Profile'
};

export function GetPageTitle(title: string): string {
  return `${TITLES.PROJECT_NAME} | ${title}`;
}
 