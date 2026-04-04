---
title: CLI
description: Interfaz de línea de comandos para ejecutar un nodo Bitsocial, crear comunidades y gestionar operaciones de protocolo.
sidebar_position: 2
---

# CLI

`bitsocial-cli` es una herramienta de línea de comandos para interactuar con el backend del protocolo Bitsocial. Le permite ejecutar un demonio P2P local, crear y configurar comunidades y publicar contenido, todo desde la terminal.

Está construido sobre la capa de cliente del protocolo Bitsocial compartido y lo utilizan [5chan](/apps/5chan/) y [Seeditar](/apps/seedit/) para la creación de comunidades y la gestión de nodos.

## Instalación

Los archivos binarios prediseñados están disponibles para Windows, macOS y Linux. Descargue la última versión para su plataforma desde GitHub:

**[Descargar desde versiones de GitHub](https://github.com/bitsocialnet/bitsocial-cli/releases)**

Después de la descarga, haga el binario ejecutable (macOS/Linux):

```bash
chmod +x bitsocial-cli
```

## Ejecutando el demonio

El uso más común de la CLI es ejecutar un nodo Bitsocial. El demonio inicia la capa de red P2P y expone una API local a la que los clientes pueden conectarse.

```bash
bitsocial-cli daemon
```

En el primer lanzamiento, el demonio genera enlaces a **WebUI**, una interfaz gráfica basada en navegador para administrar su nodo, comunidades y configuraciones. Esto es útil si prefiere una GUI a los comandos de terminal.

## Acciones clave

| Acción                     | Descripción                                                               |
| -------------------------- | ------------------------------------------------------------------------- |
| Iniciar el demonio         | Lanzar el nodo P2P de Bitsocial                                           |
| Crear una comunidad        | Crear una nueva comunidad                                                 |
| Editar una comunidad       | Actualizar la configuración de la comunidad (título, descripción, reglas) |
| Listar comunidades locales | Listar comunidades alojadas en este nodo                                  |
| Iniciar una comunidad      | Comience a servir a una comunidad específica                              |
| Detener una comunidad      | Dejar de servir a una comunidad específica                                |

Ejecute la CLI con `--help` para ver los nombres de comandos actuales y los indicadores expuestos por su versión instalada:

```bash
bitsocial-cli --help
bitsocial-cli daemon --help
```

## Flujo de trabajo típico

Un flujo de configuración común para albergar una nueva comunidad:

```bash
# 1. Start the daemon
bitsocial-cli daemon

# 2. In another terminal, inspect the available community-management commands
bitsocial-cli --help
```

A partir de ahí, utilice los comandos de administración de comunidades de la versión instalada para crear, configurar y comenzar a brindar servicios a una comunidad. Una vez iniciada, la comunidad está activa en la red Bitsocial y es accesible desde clientes compatibles.

## Enlaces

- **GitHub:** [bitsocialnet/bitsocial-cli](https://github.com/bitsocialnet/bitsocial-cli)
