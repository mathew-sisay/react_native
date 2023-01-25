import React, { useState,useEffect  } from "react";
import { View, SafeAreaView, FlatList,Text,styles } from "react-native";

import { NFTCard, HomeHeader, FocusedStatusBar } from "../componenets";
import { COLORS, NFTData } from "../constants";
import axios from 'axios'

const Home = () => {
  const [nftData, setNftData] = useState(NFTData);
  
   const [data,setData] = useState([])
  
  useEffect (() => {

    async function fecthData() {

      const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts/1')
      setData(data )
    }
      fecthData()
  },[])

       
  const handleSearch = (value) => {
    if (value.length === 0) {
      setNftData(NFTData);
    }

    const filteredData = NFTData.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredData.length === 0) {
      setNftData(NFTData);
    } else {
      setNftData(filteredData);
    }
  };

  return (

    
    <SafeAreaView style={{ flex: 1 }}>


        <View>
          <Text >{data.title}</Text>
          <Text>{data.body}</Text>
        </View>
  

      <FocusedStatusBar backgroundColor={COLORS.primary} />
      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 0 }}>
          <FlatList
            data={nftData}
            renderItem={({ item }) => <NFTCard data={item} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<HomeHeader onSearch={handleSearch} />}
          />
        </View>

        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <View
            style={{ height: 300, backgroundColor: COLORS.primary }} />
          <View style={{ flex: 1, backgroundColor: COLORS.white }} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;