<---How to Use It ---->
Please copy the json code to a blank logic app.
Pre-requisites 
    1. Logic App Contributor Role
    2. Log Analytics contributor role
    3. either use a system assigned managed identity to ingest logs into workspace.
    4. API key from Open Ai 
        to obtain this key you can navigate to -https://platform.openai.com/overview
            Go to profile and generate a key from there to use in your logic app.
    5. Mailbox credential You have to configure alerts to come into to your mailbox first, and using this logic app you can set a trigger to perform this acitivity when a sender, subject matches to EPM values.
then you will be parsing this data and ingest into LAW.
Once the custom data table is filled we can set up detection query on each alert that comes from EPM to have our SOC team work on remediation as soon as they hit the admin mailbox.

https://platform.openai.com/overview
