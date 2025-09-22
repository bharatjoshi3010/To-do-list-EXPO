// import { useCallback, useEffect, useState } from "react";
// import { FlatList, RefreshControl, Text, ToastAndroid, View } from "react-native";
// import { Query } from "react-native-appwrite";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { config, tablesDB } from '../lib/appwrite';
// Query;

// export default function Index() {

//   const [refreshing, setRefreshing] = useState(false);

//   // Function to handle refresh
//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     ToastAndroid.show("Refreshing...", ToastAndroid.SHORT);
//     // Simulate fetching data from API
//     setTimeout(() => {
//       setRefreshing(false);
//       init()
//       console.log('Data refreshed!');
//     }, 2000);
//   }, []);

//   const [tasks, setTasks] = useState([])
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     init()
//   },[])
 
//   const init = async () => {
//     getData();
//   }

//   const getData = async () => {
//     // try {
//     //   let response = await tablesDB.listRows(
//     //     config.db,
//     //     config.tableId,
//     //     [
//     //       Query.equal('title', 'Hamlet')
//     //     ]
//     //   );
//     //   response.then(function())
      
//     // }catch(error){
//     //   setError(error)
//     // }
//     const promise = tablesDB.listRows({
//     databaseId: config.db,
//     tableId: config.tableId,
//     // queries: [
//     //     Query.equal('body', 'complete')
//     // ]
//     });

//     promise.then(function (response) {
//       console.log("response")
//     console.log(response);
//     // setTasks(response.rows.map(row => row.body))
//     setTasks(response.rows.map(row => row.body));
//     console.log('operation');
//     console.log(response.rows.map(row => row.body));
//     console.log("tasks")
//     console.log(tasks)
//       }, function (error) {
//     console.log(error);
//     });
//   }

//   return (
//     <SafeAreaView>
//         <View><Text>To do list:</Text></View>
//         <FlatList 
//           data = {tasks}
//           renderItem={(item) => (<Text>{item.item}</Text>)} //here it is not taking the shortcut of having same(destructuring) name that's why we are writing item.item instead of item 
//           refreshControl ={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
//         >

//         </FlatList>
//     </SafeAreaView>
    
//   );
// }
import { Stack } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { SafeAreaView } from "react-native-safe-area-context";
import { config, tablesDB } from '../../lib/appwrite';

export default function Index() {
  const [refreshing, setRefreshing] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Refresh Handler
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    ToastAndroid.show("Refreshing...", ToastAndroid.SHORT);
    init();
    setTimeout(() => {
      
      setRefreshing(false);
      console.log("Data refreshed!");
    }, 1500);
  }, []);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    setLoading(true);
    await getData();
    setLoading(false);
  };

  const getData = async () => {
    try {
      // Replace this with your real database call
      const promise = tablesDB.listRows({
        databaseId: config.db,
        tableId: config.tableId,
      });

      promise.then(
        function (response) {
          console.log("response", response);
          console.log("response");
          console.log(response)
          // const data = response.rows.map((row) => row.body);
          const data = response.rows.map(item => ({
                  body: item.body,
                  complete: item.complete
          }));
          console.log("data");
          console.log(data);

          setTasks(data);
          console.log("tasks");
          console.log(tasks);
        },
        function (error) {
          console.log(error);
          setError(error);
        }
      );
    } catch (err) {
      console.error(err);
      setError(err);
    }
  };

  const renderTask = ({ item }) => (
    <View style={styles.taskCard}>
      
      <BouncyCheckbox
            size={25}
            fillColor="#4A90E2"
            unfillColor="#FFFFFF"
            iconStyle={{ borderColor: "aqua" }}
            innerIconStyle={{ borderWidth: 2 }}
            textStyle={{ fontFamily: "JosefinSans-Regular" }}
            isChecked = {item.complete}
            // onPress={() => {}}
      />
      <Text style={styles.taskText}>{item.body}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>   
      <Stack.Screen options={{ headerShown: false }} />    
    {/* the above line removes the screen name*/}
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>My To-Do List</Text>
        <TouchableOpacity onPress={init}>
          <Text style={styles.refreshText}>↻</Text>
        </TouchableOpacity>
      </View>

      {/* Loader */}
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Loading tasks...</Text>
        </View>
      )}

      {/* Error State */}
      {error && !loading && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Something went wrong 😢</Text>
          <Text style={styles.errorDetails}>{error.message}</Text>
        </View>
      )}

      {/* Task List */}
      {!loading && tasks.length > 0 && (
        <FlatList
          data={tasks}
          renderItem={renderTask}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.listContainer}
        />
      )}

      {/* Empty State */}
      {!loading && tasks.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No tasks yet. 🎉</Text>
          <Text style={styles.emptySubText}>
            Pull down to refresh or add some tasks!
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

// --- STYLES ---
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#F7F8FA",
  },
  header: {
    backgroundColor: "#4A90E2",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  refreshText: {
    fontSize: 22,
    color: "#fff",
  },
  listContainer: {
    padding: 15,
  },
  taskCard: {
    flexDirection: 'row',
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  taskText: {
    fontSize: 16,
    color: "#333",
  },
  loader: {
    marginTop: 50,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    marginTop: 50,
    padding: 20,
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
  },
  errorDetails: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
    textAlign: "center",
  },
  emptyContainer: {
    marginTop: 50,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#555",
  },
  emptySubText: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
});
