import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '@/views/LandingPage.vue';
import GameList from '@/views/GameList.vue';
import GameDetails from '@/views/GameDetails.vue';
import WaitingRoom from '@/views/WaitingRoom.vue';
import GamePlay from '@/views/GamePlay.vue';

const routes = [
    { path: '/', name: 'LandingPage', component: LandingPage },
    { path: '/game-list', name: 'GameList', component: GameList },
    { path: '/game-details', name: 'GameDetails', component: GameDetails },
    { path: '/waiting-room', name: 'WaitingRoom', component: WaitingRoom },
    { path: '/game-play', name: 'GamePlay', component: GamePlay },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
