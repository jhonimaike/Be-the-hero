import React from 'react';
import { FlatList, View, Text, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

/**Ele sabe qual importar dependendo do celular */
import logoImg from '../../assets/logo.png'
import styles from './styles';

/** Quando quisermos utilizar uma Lista utilizaremos o FlatList 
 * Em arrowFunction utilizamos paranteses () quando queremos retornar
 * JSX e chaves para O
*/
export default function Incidents() {

    /**Similar ao useHistory do web */
    const navigation = useNavigation();

    function navigateToDetail() {
        navigation.navigate('Detail'); /**Aqui precisa ser o mesmo nome que foi definido na rota */
    }

    return (
        <View style={styles.container}>
            <View style={styles.header} >
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>0 casos.</Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e seja feliz!</Text>

            <FlatList
                style={styles.incidentList}
                keyExtractor={incident => String(incident)}
                showsVerticalScrollIndicator={false} /**Nao mostrar scroll */
                data={[1, 2, 3]}
                renderItem={() => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>APAD</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>Cadelinha atropelada</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>120,00 R$</Text>

                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={navigateToDetail}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041"></Feather>
                        </TouchableOpacity>
                    </View>
                )}
            />

            {/* <View style={styles.incidentList}>
                <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>ONG:</Text>
                    <Text style={styles.incidentValue}>APAD</Text>

                    <Text style={styles.incidentProperty}>CASO:</Text>
                    <Text style={styles.incidentValue}>Cadelinha atropelada</Text>

                    <Text style={styles.incidentProperty}>VALOR:</Text>
                    <Text style={styles.incidentValue}>120,00 R$</Text>

                    <TouchableOpacity
                        style={styles.detailsButton}
                        onPress={() => { }}>
                        <Text styles={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#E02041"></Feather>
                    </TouchableOpacity>
                </View>

                <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>ONG:</Text>
                    <Text style={styles.incidentValue}>APAD</Text>

                    <Text style={styles.incidentProperty}>CASO:</Text>
                    <Text style={styles.incidentValue}>Cadelinha atropelada</Text>

                    <Text style={styles.incidentProperty}>VALOR:</Text>
                    <Text style={styles.incidentValue}>120,00 R$</Text>

                    <TouchableOpacity
                        style={styles.detailsButton}
                        onPress={() => { }}>
                        <Text styles={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#E02041"></Feather>
                    </TouchableOpacity>
                </View>

                <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>ONG:</Text>
                    <Text style={styles.incidentValue}>APAD</Text>

                    <Text style={styles.incidentProperty}>CASO:</Text>
                    <Text style={styles.incidentValue}>Cadelinha atropelada</Text>

                    <Text style={styles.incidentProperty}>VALOR:</Text>
                    <Text style={styles.incidentValue}>120,00 R$</Text>

                    <TouchableOpacity
                        style={styles.detailsButton}
                        onPress={() => { }}>
                        <Text styles={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#E02041"></Feather>
                    </TouchableOpacity>
                </View>
            </View> */}
        </View>
    );
}