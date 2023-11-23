import React, { useState } from 'react'; 
import {
  Button,
  Image,
  SafeAreaView, 
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
 
import {launchCamera} from 'react-native-image-picker';
 
 
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [imageUri, setImageUri] = useState(null);


  const handleTakePhoto = () => {
    const options = {
      saveToPhotos: true,
      mediaType: 'photo', 
    } as any;
  
    launchCamera(options, (response:any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else { 
        setImageUri(response.assets[0].uri);
      }
    });
  };
  
 
  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.sectionContainer}>
        <Button title="Tirar Foto" onPress={handleTakePhoto} />
        {imageUri && (
        <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
      )}
      </View>
    </SafeAreaView>
  );
  
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
