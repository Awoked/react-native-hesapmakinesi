import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

export default function App() {


    const [firstNumberActive, setFirstNumberActive] = useState(true);
    const [firstNumber, setFirstNumber] = useState(0);
    const [secondNumber, setSecondNumber] = useState(0);

    const [resultActive, setResultActive] = useState(false);
    const [result, setResult] = useState(0);


    const resetAll = () => {
        setFirstNumber(0);
        setSecondNumber(0);
        setResult(0);
        setFirstNumberActive(true);
        setResultActive(false);
    }


    const Calculate = (number) => {
        const newDigit = (firstNumberActive ? firstNumber.toString() : secondNumber.toString()) + number.toString();
        const parsedNumber = Number(newDigit);

        firstNumberActive ? setFirstNumber(parsedNumber) : setSecondNumber(parsedNumber)
    }

    return (
        <SafeAreaView style={[styles.container, styles.AndroidSafeArea]}>
            <View style={styles.calculatorOutput}>
                <Text style={styles.text}>
                    {
                        !resultActive ?
                            firstNumberActive ?
                                firstNumber
                                :
                                secondNumber
                            :
                            result
                    }
                </Text>
            </View>

            <View style={styles.calculatorButtonsWrapper}>
                {
                    [...Array(10)].map((data, index) => {
                        const _number = index + 1;
                        const number = _number > 9 ? 0 : _number
                        return (
                            <View style={styles.inputButtonWrapper} key={index}>
                                <TouchableHighlight
                                    style={styles.inputButton}
                                    onPress={() => { Calculate(number) }}
                                    underlayColor={"yellow"}
                                >
                                    <Text style={styles.text}>
                                        {number}
                                    </Text>
                                </TouchableHighlight>
                            </View>
                        )
                    })
                }

                <View style={styles.inputButtonWrapper}>
                    <TouchableHighlight
                        style={styles.inputButton}
                        onPress={() => { resetAll() }}
                        underlayColor={"yellow"}
                    >
                        <Text style={styles.text}>
                            Reset
                        </Text>
                    </TouchableHighlight>
                </View>


                <View style={styles.inputButtonWrapper}>
                    <TouchableHighlight
                        style={styles.inputButton}
                        onPress={() => {
                            setFirstNumberActive(false);
                        }}
                        underlayColor={"yellow"}
                    >
                        <Text style={styles.text}>
                            +
                        </Text>
                    </TouchableHighlight>
                </View>

                <View style={styles.inputButtonWrapper}>
                    <TouchableHighlight
                        style={styles.inputButton}
                        onPress={() => {
                            setResult(firstNumber + secondNumber);
                            setResultActive(true)
                        }}
                        underlayColor={"yellow"}
                    >
                        <Text style={styles.text}>
                            =
                        </Text>
                    </TouchableHighlight>
                </View>



            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    container: {
        position: 'relative',
        padding: 20,
    },
    calculatorOutput: {
        paddingTop: 50,
        paddingBottom: 20,
        marginBottom: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 2,
        borderColor: "#dedede",
        alignItems: "flex-end",
    },
    text: {
        fontSize: 24,
        fontWeight: "bold"
    },
    calculatorButtonsWrapper: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    inputButton: {
        borderWidth: 1,
        borderColor: "#242424",
        width: "100%",
        aspectRatio: "1/1",
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputButtonWrapper: {
        width: "33%",
        padding: 6,
    }
});
