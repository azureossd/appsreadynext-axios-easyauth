# Express/Axios - Authentication/Authorization Middleware Training

>**The purpose of this repository is intended just for training material and it is not recommended to take this as a reference for production scenarios.**

>**Portions if this code use Azure Cognitive Services.**  

To continue use that portion of the sample, please go to https://azure.microsoft.com/en-us/try/cognitive-services/ for steps on how to get your API Key.  Once you create your account, you can add the App Settings  "subscriptionKey" and "location" with the values from your subscription.

[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fazureossd%2Fappsreadynext-axios-easyauth%2Fmaster%2Ftemplate.json)

## Scenario - HTTP 431

1. Enable **Authentication/Authorization**, select **App Service Authentication** On, and **Log in with Azure Active Directory**.
2. Select **Express** and save.
3. Go to Application Logs and enable file system logs with a retention of 7 days and save changes.
3. Go to the site and you'll receive an HTTP 431 error.
4. Add WEBSITE_AUTH_DISABLE_IDENTITY_FLOW=true to your App Settings to resolve the issue.

## Scenario - Backend Code Misconfiguation
1. Go back to the site and sign-in.
2. Press the "Test Using Axios" button.
3. The site will continue to wait for a response and receive an HTTP 500 error.
4. Review application logs which will show a 401 error.

```bash

[ERROR]  (node:53) UnhandledPromiseRejectionWarning: Error: Request failed with status code 401
[ERROR]      at createError (/node_modules/axios/lib/core/createError.js:16:15)
[ERROR]      at settle (/node_modules/axios/lib/core/settle.js:17:12)

```
5. EasyAuth logs will show the following error.

```bash
Failed to forward request to application. Encountered a System.Net.Http.HttpRequestException exception after 120404.003ms with message: An error occurred while sending the request.. Check application logs to verify the application is properly handling HTTP traffic.
```
6. To resolve the issue, update `line 40` in app.js with the following.
```bash
axios.get(req.headers.referer + '/testAxios.json', withCredentials: true)
```
By default, withCredentials is disabled with prevents the session cookie used with AAD from being passed with the request.  More information about Axios configurations can be found at https://github.com/axios/axios#request-config

## Scenario - Frontend Code Misconfiguation

