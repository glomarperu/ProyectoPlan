# Planify
   Este es el proyecto (MVP) desarrollado para el curso Desarrollo de Aplicaciones Móviles 2, donde se creó una aplicación móvil utilizando React Native y TypeScript. La aplicación permite a los usuarios gestionar tareas, realizar autenticación y configurar opciones generales.

## Step 1: Start the Metro Server

**React Native:** Framework para desarrollar aplicaciones móviles de alto rendimiento usando JavaScript y React.

**TypeScript:** Superset de JavaScript que agrega tipado estático, mejorando la calidad del código y la experiencia de desarrollo.

**React Navigation:** Biblioteca para manejar la navegación dentro de la aplicación mediante stacks.

**Firebase:** Plataforma para:

            Autenticación de usuarios (Firebase Authentication).

            Almacenamiento de datos en tiempo real (Firestore).

**Context API:** Para la gestión del estado global de la aplicación.


## Objetivo del Proyecto

El objetivo principal de este proyecto es desarrollar una aplicación móvil funcional que permita a los usuarios gestionar sus tareas diarias de manera eficiente. A través de esta aplicación, se busca consolidar habilidades en React Native, TypeScript y el uso de servicios en la nube como Firebase, garantizando un diseño escalable, modular y fácil de mantener.

### Descripción General
•	Carpeta src: Contiene todos los elementos principales del proyecto.
      o	components: Componentes reutilizables, como botones personalizados.
      o	context: Implementación de Context API para la gestión del estado global.
      o	img: contiene imágenes que se usan en el proyecto, tipo icono.
      o	routes: Configuración de la navegación mediante stacks.
      o	screens: Vistas principales de la aplicación, organizadas por funcionalidades (auth, config, home, tasks).
      o	theme: Definición de los estilos del proyecto.
 
###Funcionalidades Implementadas

La aplicación cuenta con las siguientes funcionalidades:

**1. Autenticación**
•	Pantallas: LoginScreen.tsx, RegisterScreen.tsx
•	Permite a los usuarios registrarse y acceder mediante credenciales, con la authentication de Firebase.

**2. Gestión de Tareas**
•	Pantallas:
o	TaskListScreen.tsx: Lista de tareas.
o	AddTaskScreen.tsx: Agregar una nueva tarea.
o	EditTaskScreen.tsx: Editar una tarea existente.
o	DeleteTaskScreen.tsx: Eliminar una tarea.

•	Gestión del Estado: El archivo TaskContext.tsx implementa el Context API para gestionar el estado global de las tareas por cada usuario, evitando redundancias y facilitando la comunicación entre componentes.
 
**3. Configuración**
•	Pantalla: ConfigurationScreen.tsx
•	Configuraciones generales de la aplicación, por ahora está integrado la opción de cerrar sesión. 

**4. Navegación**
•	Implementada mediante StackNavigation.tsx para facilitar el flujo entre las pantallas.
•	La pantalla HomeScreen.tsx, es la pantalla principal luego de iniciar sesión o registrarse, allí están implementados los botones de agregar tarea, listar tarea y configuración, y desde allí se hace la navegación a otras pantallas. 

**5. Tema y Estilo**
•	Definido en theme/theme.ts para mantener una apariencia consistente.

**6. Componentes Reutilizables**
•	ButtonComponent.tsx: Este componente se utiliza para crear botones estilizados y reutilizables en toda la aplicación. Admite personalización mediante props como title, onPress y estilos adicionales.

