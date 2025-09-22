//this is a basic setup to connect the app with appwrite

import { Platform } from 'react-native';
import { Account, Client, TablesDB } from 'react-native-appwrite';

const config = {
    endpoint : 'https://fra.cloud.appwrite.io/v1',
    projectId : '68cfa9820004123461bd',
    db:"68cfab990019efa06fb4",
    tableId : 'tasks',
    tab : {
        tasks: "tasks"
    }
};

const client = new Client()
.setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
.setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID)

switch(Platform.OS){
    // case 'ios':
    //     client.setPlatform("com.")
    //     break
    case 'android' : 
        client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_BUNDLE_ID) 
        break  
}

const account = new Account(client);


const tablesDB = new TablesDB(client);

export { account, client, config, tablesDB };

