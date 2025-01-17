# Restauración de Respaldo en Strapi

Este README describe los pasos para restaurar un respaldo completo de un proyecto Strapi, incluyendo su base de datos (PostgreSQL), configuraciones y archivos.

---

## **Requisitos previos**

1. **PostgreSQL** instalado y funcionando.
2. **Strapi** instalado en el entorno.
3. **Node.js** y **Yarn/NPM** instalados.
4. Archivo de respaldo llamado `strapi-backup.tar` que incluye:
   - `backup-api`: Código fuente del backend.
   - `backup-config`: Configuración de Strapi.
   - `backup-extensions`: Extensiones personalizadas.
   - `backup-uploads`: Archivos subidos.
   - `backup.dump`: Respaldo de la base de datos PostgreSQL.

---

## **1. Extraer el archivo de respaldo**

Descomprime el archivo `strapi-backup.tar` para recuperar los elementos necesarios:

```bash
tar -xzvf strapi-backup.tar
```

Esto generará las siguientes carpetas y archivo:

- `backup-api`
- `backup-config`
- `backup-extensions`
- `backup-uploads`
- `backup.dump`

---

## **2. Restaurar la base de datos**

1. **Crear una base de datos vacía:**

   Asegúrate de tener una base de datos vacía con el nombre correcto:

   ```bash
   createdb -U postgres nombre_base_datos
   ```

2. **Restaurar la base de datos desde el archivo `backup.dump`:**

   Utiliza el comando `pg_restore` para importar los datos:

   ```bash
   pg_restore -U postgres -d nombre_base_datos -h localhost -p 5432 --clean backup.dump
   ```

   - Cambia `nombre_base_datos` por el nombre de tu base de datos.
   - Si la base de datos ya existe, el flag `--clean` eliminará los datos actuales antes de restaurarlos.

---

## **3. Restaurar el proyecto Strapi**

1. **Mover las carpetas extraídas:**

   Copia las carpetas del respaldo a la ubicación deseada del proyecto:

   ```bash
   mv backup-api ./mi-proyecto/api
   mv backup-config ./mi-proyecto/config
   mv backup-extensions ./mi-proyecto/extensions
   mv backup-uploads ./mi-proyecto/uploads
   ```

2. **Instalar las dependencias:**

   Accede al directorio del proyecto y ejecuta el siguiente comando:

   ```bash
   cd mi-proyecto
   npm install
   # o
   yarn install
   ```

3. **Verificar la configuración:**

   - **Base de datos:** Asegúrate de que `config/database.js` apunte a tu base de datos restaurada.
   - **Servidor:** Confirma que los datos en `config/server.js` coincidan con tu entorno (puerto, host, etc.).

---

## **4. Iniciar el proyecto**

Ejecuta el servidor de Strapi:

```bash
npm run develop
# o
yarn develop
```

Esto iniciará el proyecto y lo hará accesible desde la URL predeterminada: `http://localhost:1337/admin`.

---

## **5. Validar los datos restaurados**

1. **Inicia sesión:** Accede al panel de administración de Strapi en `http://localhost:1337/admin`.

2. **Verifica los datos:** Asegúrate de que:
   - Los datos, configuraciones y medios subidos se restauraron correctamente.
   - Los permisos y roles están configurados como esperas.

---

## **Notas adicionales**

1. **Usuarios administrativos:** Si los usuarios no fueron restaurados, deberás crearlos manualmente.
2. **Permisos de roles:** Revisa y ajusta los permisos de acceso según sea necesario.
3. **Configuraciones personalizadas:** Si estás restaurando en un entorno diferente, podrías necesitar ajustar configuraciones adicionales.

---

## **Solución de problemas**

### Error: `pg_restore: [archiver] unsupported version`:

- Asegúrate de que la versión de PostgreSQL en tu entorno coincida con la versión utilizada para crear el respaldo.

### Error: `tar.exe: Couldn't visit directory`:

- Asegúrate de que el archivo `strapi-backup.tar` esté completo y no corrupto.

---

Con estos pasos deberías poder restaurar tu proyecto Strapi de manera exitosa. Si necesitas ayuda adicional, no dudes en solicitarla.
