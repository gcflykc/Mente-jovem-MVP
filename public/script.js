// Importa as funções necessárias do Firebase SDK
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js';
import { getFirebaseConfig } from './firebase-config.js';

// Inicializa o Firebase com a configuração decodificada
const app = initializeApp(getFirebaseConfig());
const auth = getAuth(app);
const db = getFirestore(app);

// Função para salvar o resultado do quiz no Firestore
export async function saveResultToFirebase(score, classification) {
    const user = auth.currentUser;
    if (user) {
        try {
            await addDoc(collection(db, 'quizResults'), {
                userId: user.uid,
                score: score,
                classification: classification,
                timestamp: new Date()
            });
            console.log('Resultado salvo com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar resultado:', error);
            throw error;
        }
    } else {
        throw new Error('Usuário não autenticado');
    }
}

// Autenticação no login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        try {
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = 'quiz.html';
        } catch (error) {
            document.getElementById('errorMessage').textContent = 'Erro: ' + error.message;
        }
    });
}

// Registro de novo usuário
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const errorMessage = document.getElementById('errorMessage');
        const successMessage = document.getElementById('successMessage');

        if (password !== confirmPassword) {
            errorMessage.textContent = 'As senhas não coincidem.';
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            successMessage.textContent = 'Cadastro realizado com sucesso! Redirecionando para o quiz...';
            errorMessage.textContent = '';
            setTimeout(() => {
                window.location.href = 'quiz.html';
            }, 2000);
        } catch (error) {
            errorMessage.textContent = 'Erro: ' + error.message;
            successMessage.textContent = '';
        }
    });
}

// Exporta auth e db para uso em outros arquivos
export { auth, db };
