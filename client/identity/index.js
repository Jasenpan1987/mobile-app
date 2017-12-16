// import * as Lockr from "lockr";

// const APP_KEY = "planly";
// const USER_KEY = `${APP_KEY}@user`;

// interface User {
//   readonly accessToken: string;
//   readonly loginId: number;
//   readonly username: string;
//   readonly isAuthenticated: boolean;
// };

// export function get(): User {
//   const data: any = Lockr.get(USER_KEY) || {};
//   const { accessToken } = data;
//   const identity = data.identity || {};
//   return {
//     accessToken,
//     isAuthenticated: !!accessToken && !!identity.username,
//     loginId: identity.loginId,
//     username: identity.username,
//   };
// }

// export function remember(user: User) {
//   const data: any = {
//     accessToken: user.accessToken,
//     identity: {
//       logingId: user.loginId,
//       username: user.username,
//     },
//   };
//   Lockr.set(USER_KEY, data);
// }

// export function forget() {
//   Lockr.rm(USER_KEY);
// }
