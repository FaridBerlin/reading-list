// Reading List App with Barcode Scanner
// Features:
// 1. Manual book entry via text input
// 2. Barcode scanning with camera
// 3. Automatic book data fetching from OpenLibrary API
// 4. Display books in a scrollable list

import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import {Camera, CameraView} from "expo-camera";

const index = () => {
   const [books, setBooks] = useState([]);
   const [input, setInput] = useState("");
   const [hasPermission, setHasPermission] = useState(null);
   const [scanning, setScanning] = useState(false);

   useEffect(()=>{
      // IIFE
      (async()=>{
         const {status} = await Camera.requestCameraPermissionsAsync();
         setHasPermission(status === "granted");
      })();
   }, []);

  const handleBarCodeScanned = async ({type, data}) => {
      setScanning(false);
      try {
         const res = await fetch(`https://openlibrary.org/isbn/${data}.json`);
         if (!res.ok) throw new Error("Nicht gefunden");
         const bookData = await res.json();
         setBooks((prev) => [
            ...prev, {id: Date.now().toString(), title: bookData.title}])
      } catch (error) {
          alert("Buch nicht gefunden: " + error.message);
          console.error(error);
         
      }
      // alert(`Barcode gescannt: ${data}`);
      console.log({data});
   }
 

   if (hasPermission === null) return <Text>Erlaubnis anfragen...</Text>;

   if (hasPermission === false){
      return (
         <View style={styles.container}>
            <Text>Keine Kamera-Berechtigung</Text>
            <Button 
               title='Erlaubnis anfragen'
               onPress={async () => {
                  const {status} = await Camera.requestCameraPermissionsAsync();
                  setHasPermission(status === "granted");
               }}
            />
         </View>
      )
   };

   if (scanning){
      return (
         <View style={{flex: 1}}>
            <CameraView 
               style={{flex: 1}}
               facing='back'
               barcodeScannerSettings={{
                  barcodeTypes: ["ean13", "ean8", "upc_a", "upc_e", "code128", "code39"],
               }}
               onBarcodeScanned={handleBarCodeScanned}
            />
            <TouchableOpacity 
               style={[styles.button, {position: 'absolute', bottom: 50, alignSelf: 'center'}]}
               onPress={() => setScanning(false)}
            >
               <Text style={styles.buttonText}>Abbrechen</Text>
            </TouchableOpacity>
         </View>
      )
   }

   const addBook = ()=>{
      if (!input) return;
      setBooks([...books, {id: Date.now().toString(), title:input}]);
      setInput("");
   }
   
  return (
   // View ist wie ein div in HTML, ein Container für Layout
    <View style={styles.container}>
      <Text>Reading List</Text>
      {/* 
      TextInput ist wie ein HTML input, es erlaubt Benutzereingaben
      onChangeText = Callback bei Änderungen
      */}
      <TextInput 
         style={styles.input}
         value={input}
         onChangeText={setInput}
         placeholder='Buchtitel eingeben'
      />
      <TouchableOpacity 
         style={styles.button}
         onPress={addBook}
      >
         <Text style={styles.buttonText}>Hinzufügen</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
         style={[styles.button, {backgroundColor: "#28a745"}]}
         onPress={()=>setScanning(true)}
      >
         <Text style={styles.buttonText}>📷 Buch scannen</Text>
      </TouchableOpacity>
      <FlatList 
         data={books}
         keyExtractor={(item) => item.id}
         renderItem={({item}) => <Text>{item.title}</Text>}
      />
    </View>
  )
}

export default index

const styles = StyleSheet.create({
   /*
   Styles werden in React-Native als JS-Objekte geschrieben, nicht als CSS-Strings. Die Syntax ähnelt CSS aber es gibt nur die Style-Properties
   die React Native unterstützt
   StyleSheet.create() prüft die Styles auf Gültigkeit und optimiert sie
   */
   container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
   },
   input: {
      borderWidth: 1, padding: 8, marginVertical: 10
   },
   button: {
      backgroundColor: "#007BFF",
      paddingVertical: 10,
      paddingHorizontal:10,
      borderRadius: 6,
      alignItems: "center",
      marginBottom: 15,
      marginTop: 10
   },
   buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600"
   }
})

/*
Wichtige Unterschiede zu CSS:

- Keine Bindestriche sondern camelCase (marginVertical anstatt margin-vertical)
- Alle Werte ohne Einheiten > immer Pixel(z.B. padding: 20)
- Flexbox ist standardmäßig aktiv, display:flex ist nicht nötig
*/