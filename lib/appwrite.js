//this is a basic setup to connect the app with appwrite

import { Platform } from 'react-native';
import { Client, TablesDB } from 'react-native-appwrite';

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
.setEndpoint(config.endpoint)
.setProject(config.projectId)

switch(Platform.OS){
    // case 'ios':
    //     client.setPlatform("com.")
    //     break
    case 'android' : 
        client.setPlatform("com.bharat.company") 
        break  
}
const tablesDB = new TablesDB(client);

export { client, config, tablesDB };

