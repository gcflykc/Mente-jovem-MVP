// Função para decodificar a configuração ofuscada
export function getFirebaseConfig() {
    const encodedConfig = 'eyJhcGlLZXkiOiAiQUl6YVN5REVOTDhkY21Fb0pOd2VTa29hWkVzc3haMFVkN01jU1A4IiwiYXV0aERvbWFpbiI6ICJtdnAtbWVudGVqb3ZlbS5maXJlYmFzZWFwcC5jb20iLCJwcm9qZWN0SWQiOiAibXZwLW1lbnRlam92ZW0iLCJzdG9yYWdlQnVja2V0IjogIm12cC1tZW50ZWpvdmVtLmZpcmViYXNlc3RvcmFnZS5hcHAiLCJtZXNzYWdpbmdTZW5kZXJJZCI6ICI5NjA1MzMyNzM1NTYiLCJhcHBJZCI6ICIxOjk2MDUzMzI3MzU1Njp3ZWI6ZWNmZTZjN2U4NDFiNTZiODE1MTQ0MSIsIm1lYXN1cmVtZW50SWQiOiAiRy0zUzRTRDhMSzZWIn0=';
    return JSON.parse(atob(encodedConfig));
}
