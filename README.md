# Codigo

# Sistema de Gestión de Gimnasio - Sportacus Gym - Módulo CheckIn

# Integrantes 

* Marisol Nuñes Monasterio 
* Maria Fernanda Palacios Rangel 

# Descripsión 

El proyecto se enfoca en crear un sistema de gestión para el gimnasio Sportacus Gym, el cual consiste en varios módulos. Uno de los módulos más importantes es el de CheckIn, el cual permite que los empleados registren su hora de entrada y salida cada día al escanear un código QR. Esta funcionalidad también permite llevar un control de asistencias y retardos por cada empleado.
El módulo de CheckIn tiene tres funcionalidades principales. La primera es la generación de un código QR dinámico para cada empleado utilizando la API GoQR. La segunda es la posibilidad de registrar la entrada y salida de un empleado en la base de datos mediante la lectura del código QR. La tercera funcionalidad permite consultar los registros de asistencia de un empleado, donde se muestran los registros de entrada y salida, se tiene un calendario para visualizar las asistencias y retardos y se genera una gráfica con un resumen de las asistencias y retardos.
Este sistema permitirá mejorar la eficiencia de las operaciones en el gimnasio y el módulo de CheckIn permitirá a los administradores tener un control más ágil de las asistencias y retardos, manteniendo los registros actualizados.

# Objetivo general 

Implementar un sistema de control de asistencias mediante la generación y escaneo de códigos QR para los empleados del gimnasio, con el fin de registrar de manera eficiente y precisa las entradas, salidas, retardos y faltas de cada empleado. Además, utilizar esta información para incentivar la puntualidad y el compromiso de los empleados y tomar medidas disciplinarias en caso de faltas o retardos recurrentes, con el objetivo de mejorar la eficiencia y productividad del gimnasio.


# Objetivos especificos 

* Objetivos Específicos
* Registrar entrada y salida de los empleados del gimnasio.
* Controlar la asistencia y puntualidad de los empleados.
* Facilitar el cálculo de las asistencias y retardos de los empleados.
* Generar información estadística sobre la asistencia y puntualidad de los empleados.

# Propuesta de solucion

![image](https://user-images.githubusercontent.com/126131443/233436758-1a76bd6a-932a-4a1e-abcb-977325b4a86d.png)

# Diagra de actividad 

Registar asistencia 

![image](https://user-images.githubusercontent.com/126131443/233437072-5e4f456e-7239-48fc-850f-4c79a025f6e7.png)

Adminsitrar asitencia 

![image](https://user-images.githubusercontent.com/126131443/233437147-a65530b9-29bb-413a-9279-cef02965d18a.png)

# Historias de usuario

![image](https://user-images.githubusercontent.com/126131443/233437470-9952145a-14dc-4202-87be-6008f4cdd87e.png)

Administrar asisitencia 

![image](https://user-images.githubusercontent.com/126131443/233437564-17bfd063-4e48-4756-a868-0555f9fe3b23.png)


# Modelo vista controlador 
![image](https://user-images.githubusercontent.com/126131443/233433265-8110f9a5-854c-420b-b611-1e959d9b800e.png)

# Diagrama de componentes 
![Diagrma de componentes](https://user-images.githubusercontent.com/126131443/233441275-751a5d50-a587-4dd0-b39f-a01541d070b0.jpeg)

# Modelo de datos 

Check-In

![image](https://user-images.githubusercontent.com/126131443/233442200-061d5143-9d9e-4238-a5f3-18432cfeaaf8.png)

Empleado

![image](https://user-images.githubusercontent.com/126131443/233442300-1f37df09-c050-4547-bb01-d24a1f1a0971.png)


La colección de “Empleado” almacenara la información de los empleados registrados en los siguientes campos: 
*	IdEmpleado: es el id de identificador del empelado.
*	Nombre: Nombre del empelado del gimnasio. 
*	Edad: La edad del empleado del gimnasio.
*	Rol: Rol o actividad que desempeña el empleado dentro gimnasio (puede tener más de un rol).
*	Teléfono: Teléfono de contacto del empleado del gimnasio (puede tener más de un teléfono).
*	Sueldo: Cantidad de dinero que se le paga al empleado. 
*	Turno: Horario de trabajo del empleado (Matutino, Vespertino).
*	Correo: Dirección de correo electrónico de contacto del empleado. 
*	Password: Contraseña de usuario.


La colección “Check-In” almacena información de los registros de asistencia de los empleados del gimnasio. 

*	IdEmpleado: Identificados o clave única de cada empleado del gimnasio. 
*	Fecha: Día, mes y año en que se realizan los registros de asistencia de los empelados del gimnasio. 
*	Hora: Hora de entrada y salida en que se realiza el registro en el check- in por medio del escaneo del Qr. 
*	Tipo: Hora de entrada o salida de registro de asistencia. 

# Diagrama de clases 
![image](https://user-images.githubusercontent.com/126131443/233445150-10e5f5ed-a357-4328-bcb9-c9764cfffd81.png)


# Estandares 

Se presenta un posible estándar de programación para el desarrollo de aplicaciones web utilizando el stack MEAN (MongoDB, Express.js, Angular y Node.js):

1.- Convenciones de nomenclatura:

Utilizar camelCase para los nombres de variables, funciones y métodos.
Utilizar PascalCase para los nombres de clases y componentes.
Utilizar guiones bajos para los nombres de las rutas de la API y las colecciones de la base de datos.
Utilizar nombres descriptivos y significativos para las variables, funciones y métodos.

2.- Estructura de la aplicación:

Utilizar un enfoque basado en componentes para la estructura de la aplicación Angular.
Utilizar la arquitectura de microservicios para separar diferentes componentes y servicios de la aplicación.

3.- Codificación:

Utilizar TypeScript como lenguaje de programación para mejorar la legibilidad y la seguridad del código.
Utilizar patrones de diseño y principios de SOLID para escribir código escalable y mantenible.
Utilizar pruebas unitarias y de integración para garantizar la calidad y la robustez del código.
Utilizar herramientas de linting y formateo de código para garantizar la coherencia y la legibilidad del código.

4.- Rendimiento:

Utilizar técnicas de caching y almacenamiento en caché para reducir la carga en el servidor y mejorar el rendimiento de la aplicación.
Optimizar la carga y la descarga de recursos y datos para reducir el tiempo de respuesta de la aplicación.

5.- Documentación:

Documentar el código de manera clara y concisa para facilitar el mantenimiento y la comprensión del código.
Siguiendo este estándar de programación, se puede desarrollar aplicaciones web robustas, escalables y seguras utilizando el stack MEAN.


# Diagrama de Gantt 
![image](https://user-images.githubusercontent.com/126131443/233446239-3ec7b9a8-1fe0-4e76-b1d2-741c28034700.png)

# Manual de instalacion 

Requisitos de instalacion 

ara instalar el proyecto en un entorno de desarrollo y posteriormente hacer uso de este, es necesario contar con los siguientes requerimientos de software y hardware:

Hardware
* Procesador de 64 bits con velocidad de reloj de 1 GHz o superior.
* 4 GB de memoria RAM o superior.
* Al menos 10 GB de espacio en el disco duro.

Software

* Sistema operativo Windows 7 o superior, macOS o Linux.
* Node.js versión 18.15.0 LTS.
* Angular CLI versión 14.0.2.

# Manuales 

[Manual de instalcion](https://drive.google.com/file/d/1G2XaSATIteavrtfh6WTmYXRlRCgAbTWt/view?usp=sharing)

[Manual de usuario](https://drive.google.com/file/d/12evns4C6fMkqp6i_OTGUFW9K_hOfC91H/view?usp=sharing)

# Codigo fuente 


# Casos de prueba 

Pruebas necesarias para probar la funcionalidad del CheckIn de la aplicación mediante el código QR de un empleado.

[Casoso de prueba](https://docs.google.com/spreadsheets/d/1mwLT8bF0Y0MHDZP8omcphYW4_Qvtk7hS/edit#gid=718245581)

# Organigrama dek equipo
![image](https://user-images.githubusercontent.com/126131443/233459655-14a0a53f-475a-4cd1-8203-815960242c38.png)
