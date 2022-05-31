// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // UserAPIURL:"https://localhost:44396/api/v1.0/Tweets/",
  // TweetAPIURL:"https://localhost:44313/api/v1.0/Tweets/"
  UserAPIURL:"http://tweetuserapi.azurewebsites.net/api/v1.0/Tweets/",
  TweetAPIURL:"http://tweetapi.eastus.azurecontainer.io/api/v1.0/Tweets/"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
