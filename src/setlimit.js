import { ScrollView, Text, View, StyleSheet } from "react-native";
import firestore from "@react-native-firebase/firestore";
import NavigationBar from "./components/navigationbar";
import { TouchableOpacity } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { TextInput } from "react-native-paper";
import { useState, useEffect } from "react";

export default function SetLimit({ navigation }) {
  const [temp, setTemp] = useState();
  const [noise, setNoise] = useState();
  const [penghuni, setPenghuni] = useState();
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await firestore()
          .collection("Penghuni")
          .doc("OfJiSr6rtYbbHEfNMgVQFgZrSrv2")
          .get();
        const data = querySnapshot.data();
        if (!data) {
          console.log("Error data is not found");
          console.log("penghuni kamar: ", penghuni);
        } else {
          setPenghuni(data.kamar);
          console.log("penghuni kamar: ", penghuni);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        console.log("Data:", data);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.frame}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Back to landing</Text>
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.heading}>Set Limit Kerendahan Temperatur</Text>
        <Text style={styles.text}>
          Penghuni kamar akan diberi peringatan apabila suhu kamar sudah kurang
          dari limit yang ditentukan.
        </Text>

        <View style={{ flexDirection: "row" }}>
          {/* Choose Rooms */}
          <View style={[styles.kamarBox, styles.border]}>
            <Text style={[styles.title, { textAlign: "left" }]}>Kamar</Text>
            <ScrollView>
              <View style={styles.checkbox}>
                <BouncyCheckbox
                  isChecked={isSelected}
                  onPress={(e) => setIsSelected(e)}
                />
                <Text style={styles.text}>Kamar {penghuni}</Text>
              </View>
            </ScrollView>
          </View>

          <View style={{ marginBottom: 20 }}>
            {/* Input Temperature */}
            <View style={[styles.inputBox, styles.border]}>
              <Text style={styles.title}>Temperatur</Text>
              <TextInput
                style={styles.inputText}
                value={temp}
                onChangeText={(e) => setTemp(e)}
                placeholder="°C"
              />
              <Text style={styles.body}>dalam satuan derajat Celcius (°C)</Text>
            </View>

            {/* Button */}
            <TouchableOpacity style={[styles.button, styles.border]}>
              <Text style={styles.title}>Simpan Perubahan</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.heading}>Set Limit Ketinggian Kebisingan</Text>
        <Text style={styles.text}>
          Penghuni kamar akan diberi peringatan apabila level kebisingan kamar
          sudah lebih dari limit yang ditentukan.
        </Text>

        <View style={{ flexDirection: "row" }}>
          {/* Choose Rooms */}
          <View
            style={[styles.kamarBox, styles.border, { borderColor: "#9BB8CD" }]}
          >
            <Text style={[styles.title, { textAlign: "left" }]}>Kamar</Text>
            <ScrollView>
              <View style={styles.checkbox}>
                <BouncyCheckbox
                  isChecked={isSelected}
                  onPress={(e) => setIsSelected(e)}
                />
                <Text style={styles.text}>Kamar {penghuni}</Text>
              </View>
            </ScrollView>
          </View>

          <View style={{ marginBottom: 20 }}>
            {/* Input Noise */}
            <View
              style={[
                styles.inputBox,
                styles.border,
                { borderColor: "#9BB8CD" },
              ]}
            >
              <Text style={styles.title}>Kebisingan</Text>
              <TextInput
                style={styles.inputText}
                value={noise}
                onChangeText={(e) => setNoise(e)}
                placeholder="dB"
              />
              <Text style={styles.body}>dalam satuan desibel (dB)</Text>
            </View>

            {/* Button */}
            <TouchableOpacity
              style={[
                styles.button,
                styles.border,
                { backgroundColor: "#9BB8CD" },
              ]}
            >
              <Text style={styles.title}>Simpan Perubahan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <NavigationBar page={"SetLimit"} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  border: {
    borderRadius: 30,
    borderWidth: 1,
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: "0.25",
    shadowOffset: { width: -2, height: 4 },
    shadowRadius: 10,
  },
  kamarBox: {
    backgroundColor: "white",
    width: 190,
    height: 260,
    borderColor: "#EEC759",
    flexDirection: "column",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginRight: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 10,
  },
  text: {
    paddingVertical: 5,
    fontSize: 12,
    alignSelf: "flex-start",
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputBox: {
    backgroundColor: "white",
    width: 120,
    height: 160,
    justifyContent: "center",
    borderColor: "#EEC759",
    padding: 20,
    marginBottom: 20,
  },
  inputText: {
    backgroundColor: "transparent",
    textAlign: "center",
    fontSize: 38,
    marginBottom: 10,
  },
  body: {
    fontSize: 8,
    textAlign: "center",
  },
  button: {
    width: 120,
    height: 80,
    backgroundColor: "#EEC759",
    borderColor: "#FFF7D4",
    borderWidth: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});
