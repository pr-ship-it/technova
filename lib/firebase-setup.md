# Configuración de Firebase para el Contrato TechNova AI

Para configurar Firebase para el contrato digital, sigue estos pasos:

## 1. Crear un proyecto en Firebase

1. Ve a [firebase.google.com](https://firebase.google.com) y inicia sesión con tu cuenta de Google
2. Haz clic en "Añadir proyecto" y sigue los pasos para crear un nuevo proyecto
3. Nombra tu proyecto (por ejemplo, "technova-contract")

## 2. Configurar Firestore Database

1. En el panel lateral izquierdo, selecciona "Firestore Database"
2. Haz clic en "Crear base de datos"
3. Selecciona "Comenzar en modo de prueba" (para desarrollo)
4. Selecciona la ubicación del servidor más cercana a tus usuarios

## 3. Crear la aplicación web

1. En la página de inicio del proyecto, haz clic en el icono de web (</>) para añadir una aplicación web
2. Asigna un nombre a tu aplicación (por ejemplo, "technova-contract-web")
3. Marca la opción "También configurar Firebase Hosting" si deseas desplegar la aplicación en Firebase
4. Haz clic en "Registrar app"
5. Copia la configuración de Firebase que se muestra

## 4. Actualizar la configuración en el código

1. Abre el archivo `lib/firebase.ts` en tu proyecto
2. Reemplaza el objeto `firebaseConfig` con la configuración que copiaste:

\`\`\`javascript
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};
\`\`\`

## 5. Instalar dependencias de Firebase

Ejecuta el siguiente comando en la terminal:

\`\`\`bash
npm install firebase
\`\`\`

## 6. Estructura de la base de datos

Firebase Firestore creará automáticamente las siguientes colecciones cuando se utilice la aplicación:

- **contracts**: Almacena la información general del contrato
- **partners**: Almacena la información de los socios y su estado de firma
- **signatures**: Registra cada firma con su timestamp

## 7. Reglas de seguridad (opcional)

Para un entorno de producción, deberías configurar reglas de seguridad adecuadas en Firestore. Ve a la sección "Reglas" en Firestore y configura las reglas según tus necesidades.

Ejemplo de reglas básicas:

\`\`\`
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;  // Para desarrollo
      // Para producción, deberías restringir el acceso según tus necesidades
    }
  }
}
\`\`\`

## 8. Reiniciar la aplicación

Reinicia la aplicación para que los cambios surtan efecto.
