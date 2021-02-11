# Express/Axios - Authentication/Authorization Middleware Training

>**The purpose of this repository is intended just for training material and it is not recommended to take this as a reference for production scenarios.**

[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fazureossd%2Fappsreadynext-axios-easyauth%2Fmaster%2Ftemplate.json)

1. Enable **Authentication/Authorization**, select **App Service Authentication** On, and **Log in with Azure Active Directory**.
2. Select **Express** and save.
3. Go to the site and you'll receive an HTTP 431 error.
4. Add WEBSITE_AUTH_DISABLE_IDENTITY_FLOW=true to your App Settings to resolve the issue.
5. Go back to the site and sign-in.
6. Press the "Try Translator" button.
