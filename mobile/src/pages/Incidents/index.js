import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';

/**Ele sabe qual importar dependendo do celular */
import logoImg from '../../assets/logo.png'
import styles from './styles';

/** Quando quisermos utilizar uma Lista utilizaremos o FlatList 
 * Em arrowFunction utilizamos paranteses () quando queremos retornar
 * JSX e chaves para O
*/
export default function Incidents() {
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);

    /**para controlar paginação */
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    /**Similar ao useHistory do web */
    const navigation = useNavigation();

    function navigateToDetail(incident) {
        /**Aqui precisa ser o mesmo nome que foi definido na rota 
         * Também estamos passando parâmetros
        */
        navigation.navigate('Detail', { incident });
    }

    async function loadIncidents() {
        /**Evitar enquanto uma requisição estiver acontecendo nao disparar denovo */
        if (loading) {
            return;
        }

        if (total > 0 && incident.length === total) {
            return;
        }

        setLoading(true);

        const response = await api.get('incidents', {
            params: { page }
        });

        // Substituir
        //setIncidents(response.data.incidents);

        // fazer append
        setIncidents([...incidents, ...response.data.incidents]);

        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header} >
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos.</Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e seja feliz!</Text>

            <FlatList
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                onEndReached={loadIncidents} /**Isso para carregar no fim na página */
                onEndReachedThreshold={0.2} /**Fala quantos % para que carregeue novos items */
                showsVerticalScrollIndicator={false} /**Nao mostrar scroll */
                // data={[1, 2, 3]}
                /** abrindo corchete dentro da arrow function para desestruturar e pegar só um item
                 * e para nao confundir o nome de item com incidente utilizamos : 
                 */
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(incident.value)}
                        </Text>

                        <TouchableOpacity
                            style={styles.detailsButton}
                            /** Sempre que precisamos passar parâmetros, utilizamos arrow function */
                            onPress={() => navigateToDetail(incident)}
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