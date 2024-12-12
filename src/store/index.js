import GameFactory from '@/modules/gamefactory';
import { createStore } from 'vuex';
import * as signalR from '@microsoft/signalr';
import ConnectionRequestData from '@/modules/connection';

const hubUrl = `${process.env.VUE_APP_API_URL}/GameHub`;

const store = createStore({
    state: {
        gameName: null,
        connectionRequestData: null,
        connection: null,
        gameData: null,
    },
    mutations: {
        setGameNameState(state, name) {
            state.gameName = name;
        },
        initGameDataState(state, data) {
            if (state.gameData != null) {
                // throw Error("Game state should be null when initializing");
                state.gameData = null;
            }
            state.gameData = GameFactory(state.gameName, data);
        },
        updateGameDataState(state, update) {
            try {
                console.log(`received ${update.type}`);
                const processed = state.gameData.update(update.type, update.data);
                if (!processed) {
                    throw Error(`Update type ${update.type} not implemented. Data was: ${update.data}`);
                }
            } catch (err) {
                console.error(`Error updating type: ${update.type}. Data was: ${update.data}\nError: ${err}`);
            }
        },
        setConnectionRequestDataState(state, connectionRequestData) {
            state.connectionRequestData = connectionRequestData;
        },
        setConnection(state, connection) {
            state.connection = connection;
        }
    },
    actions: {
        initConnection({ commit }) {
            return new Promise((resolve, reject) => {
                const newConnection = new signalR.HubConnectionBuilder()
                    .withUrl(hubUrl, { withCredentials: true })
                    .build();
                window.addEventListener("beforeunload", () => {
                    newConnection.invoke("NotifyDisconnect");
                    commit('setConnection', null);
                });
                newConnection.start()
                    .then(() => {
                        newConnection.on("Update", (type, data) => {
                            commit('updateGameDataState', { type, data });
                        });
                        commit('setConnection', newConnection);
                        resolve();
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        },
        initGameData({ commit }, payload) {
            commit('initGameDataState', payload);
        },
        setConnectionRequestData({ commit, state }, payload) {
            if (!state.gameName) {
                throw new Error("Game name must be set to create connection request.")
            }
            commit('setConnectionRequestDataState', new ConnectionRequestData(state.gameName, payload.isHost, payload.name, payload.roomCode ?? null));
        },
        setGameName({ commit }, name) {
            commit('setGameNameState', name);
        },
        setGameState({ commit }, payload) {
            commit('updateGameDataState', { type: payload.type, data: payload.data });
        },
    },
    getters: {
        gameName: (state) => state.gameName,
        connectionRequestData: (state) => state.connectionRequestData,
        connection: (state) => state.connection,
        gameData: (state) => state.gameData,
    }
});

export default store;