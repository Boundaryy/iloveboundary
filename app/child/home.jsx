import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, useWindowDimensions, ScrollView } from 'react-native';
import axios from 'axios';
import { Calendar } from 'react-native-calendars';
import { BarButton } from "../../components/Bar-Button";
import { globalStyles } from '../../styles/global';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
    const [userData, setUserData] = useState(null);
    const [logoutMessage, setLogoutMessage] = useState('');
    const { width, height } = useWindowDimensions(); 

    useEffect(() => {
        const fetchSituations = async () => {
            try {
              const token = await AsyncStorage.getItem("accessToken");
              const response = await axios.get(
                `https://port-0-v1-server-9zxht12blq9gr7pi.sel4.cloudtype.app/user`,
                {
                  withCredentials: true,
                  headers: {
                    Authorization: `Bearer ${token}`,
                  }
                }
              );
              await console.log(response);
              await setUserData(response.data)
            } catch (error) {
              console.error(`유저 조회 실패:`, error);
            }
          };
          fetchSituations();
    }, []);

    // const handleLogout = async () => {
    //     try {
    //         const response = await axios.post('http://boundary.main.oyunchan.com:5001/logout', {});
    //         if (response.status === 200) {
    //             setLogoutMessage(response.data); 
    //             setTimeout(() => {
    //                 router.push('/'); 
    //             }, 2000); 
    //         } else {
    //             console.log('로그아웃 실패');
    //         }
    //     } catch (error) {
    //         console.error('로그아웃 중 오류 발생:', error);
    //     }
    // };

    const containerPadding = width > 400 ? 20 : 10; 
    const buttonWidth = width > 400 ? '85%' : '95%';
    const levelImageSize = width > 400 ? 80 : 60;
    const calendarWidth = width > 400 ? '100%' : '120%';
    const headerMarginTop = height > 700 ? 80 : 50; // 버튼 컨테이너의 상단 마진 감소

    return (
        <ScrollView 
            contentContainerStyle={{ 
                flexGrow: 1, 
                paddingVertical: 20, // 상하 여백 추가
            }}
        >
            <View style={[
                globalStyles.container, 
                { 
                    padding: containerPadding,
                    marginHorizontal: 10, // 좌우 여백 추가
                }
            ]}>
                <View style={globalStyles.header}>
                    <Text style={globalStyles.title}>Boundary</Text>
                    <Text style={globalStyles.subtitle}>어렵지 않은 학습</Text>
                    <Text style={globalStyles.description}>
                        상황 대처, 게임을 통해 지능을 향상시켜요
                    </Text>
                </View>
                
                <View style={[styles.buttonContainer, { width: buttonWidth, marginTop: headerMarginTop }]}>
                    <BarButton 
                        toLink={"/child/training/situchoose"} 
                        imgLink={{ uri: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Man%20Tipping%20Hand.png" }} 
                        title={"상황 대처 학습"} 
                        explain={"게임을 통한 학습능력 상승"}
                    />
                    <BarButton 
                        toLink={"/child/training/choose"} 
                        imgLink={{ uri: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Footprints.png" }} 
                        title={"코그니션 트레이닝"} 
                        explain={"인지 기능 향상 트레이닝을 진행해요!"}
                    />
                </View>
                
                <View style={styles.header}>
                    <Text style={styles.header}>꾸준히 함께해봐요</Text>
                    <Text style={styles.description}>
                        상황 대처, 게임을 통한 학습으로 지능을 향상시켜요
                    </Text>
                  
                    <TouchableOpacity style={styles.levelContainer}>
                        <Image 
                            source={require("../../assets/images/image.png")} 
                            style={[styles.levelImage, { width: levelImageSize, height: levelImageSize }]} 
                        />
                        <View>
                            <Text style={styles.nameText}>{userData?.name ?? '...'}</Text>
                            <Text style={styles.pointText}>POINT: {userData?.point ?? '...'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                
                <Calendar style={[styles.calendar, { width: calendarWidth }]} />
                {logoutMessage ? (
                    <Text style={styles.logoutMessage}>{logoutMessage}</Text>
                ) : null}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'column',
        marginBottom: 10, // 버튼 컨테이너의 하단 마진 증가
        marginTop: 10, // 버튼 컨테이너의 상단 마진 감소
    },
    calendar: {
        marginTop: 30, // 캘린더의 상단 마진 증가
        marginBottom: 30, // 캘린더의 하단 마진 증가
        alignSelf: 'center',  
    },
    header: {
        fontSize: 26,
        gap: 4,
        fontWeight: "600",
        marginTop: 10,
    },
    description: {
        color: "#808080",
        marginBottom: 8,
    },

    logoutButton: {
        marginTop: 20,
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    logoutButtonText: {
        color: '#898989',
        fontSize: 16,
        fontWeight: '400',
    },
    logoutMessage: {
        marginTop: 20,
        alignSelf: 'center',
        fontSize: 16,
        color: '#898989',
    },
    levelContainer: {
        display:"flex",
        alignItems:"flex-start",
        backgroundColor: "#f9f9f9",
        borderRadius:"50px",
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    levelImage: {
        marginRight: 10,
        marginLeft: 10,
    },
    levelText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    nameText: {
        marginTop:"-5%",
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    pointText: {
        fontSize: 16,
        color: '#666',
    },
});

export default App;
