---
title: CLI
description: Bitsocial 노드 실행, 커뮤니티 생성 및 프로토콜 작업 관리를 위한 명령줄 인터페이스입니다.
sidebar_position: 2
---

# CLI

`bitsocial-cli`는 Bitsocial 프로토콜 백엔드와 상호 작용하기 위한 명령줄 도구입니다. 로컬 P2P 데몬을 실행하고, 커뮤니티를 생성 및 구성하고, 콘텐츠를 게시하는 등 모든 작업을 터미널에서 수행할 수 있습니다.

이는 공유 Bitsocial 프로토콜 클라이언트 레이어 위에 구축되며 커뮤니티 생성 및 노드 관리를 위해 [5chan](/apps/5chan/) 및 [Seed](/apps/seedit/)에서 사용됩니다.

## 설치

사전 빌드된 바이너리는 Windows, macOS 및 Linux에서 사용할 수 있습니다. GitHub에서 해당 플랫폼에 대한 최신 릴리스를 다운로드하세요.

**[GitHub 릴리스에서 다운로드](https://github.com/bitsocialnet/bitsocial-cli/releases)**

다운로드 후 바이너리 실행 파일을 만듭니다(macOS/Linux).

```bash
chmod +x bitsocial-cli
```

## 데몬 실행

CLI의 가장 일반적인 용도는 Bitsocial 노드를 실행하는 것입니다. 데몬은 P2P 네트워킹 계층을 시작하고 클라이언트가 연결할 수 있는 로컬 API를 노출합니다.

```bash
bitsocial-cli daemon
```

처음 실행 시 데몬은 노드, 커뮤니티 및 설정을 관리하기 위한 브라우저 기반 그래픽 인터페이스인 **WebUI**에 대한 링크를 출력합니다. 이는 터미널 명령보다 GUI를 선호하는 경우에 유용합니다.

## 주요 활동

| 액션               | 설명                                     |
| ------------------ | ---------------------------------------- |
| 데몬 시작          | Bitsocial P2P 노드 실행                  |
| 커뮤니티 만들기    | 새 커뮤니티 만들기                       |
| 커뮤니티 편집      | 커뮤니티 설정 업데이트(제목, 설명, 규칙) |
| 지역 커뮤니티 나열 | 이 노드에서 호스팅되는 커뮤니티 나열     |
| 커뮤니티 시작      | 특정 커뮤니티에 봉사 시작하기            |
| 커뮤니티 중지      | 특정 커뮤니티 서비스 중단                |

`--help`로 CLI를 실행하여 설치된 릴리스에서 노출된 현재 명령 이름과 플래그를 확인하세요.

```bash
bitsocial-cli --help
bitsocial-cli daemon --help
```

## 일반적인 작업 흐름

새 커뮤니티 호스팅을 위한 일반적인 설정 흐름:

```bash
# 1. Start the daemon
bitsocial-cli daemon

# 2. In another terminal, inspect the available community-management commands
bitsocial-cli --help
```

여기에서 설치된 릴리스의 커뮤니티 관리 명령을 사용하여 커뮤니티를 생성, 구성 및 제공을 시작합니다. 일단 시작되면 커뮤니티는 Bitsocial 네트워크에서 활성화되며 호환되는 클라이언트에서 액세스할 수 있습니다.

## 링크

- **GitHub:** [ 비트소셜넷/bitsocial-cli](https://github.com/bitsocialnet/bitsocial-cli)
