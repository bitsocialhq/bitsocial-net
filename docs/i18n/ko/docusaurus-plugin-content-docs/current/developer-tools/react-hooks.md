---
title: 반응 후크
description: Bitsocial 프로토콜에서 분산형 소셜 애플리케이션을 구축하기 위한 React Hooks 라이브러리입니다.
sidebar_position: 1
---

# 반응 후크

`bitsocial-react-hooks` 패키지는 Bitsocial 프로토콜과 상호 작용하기 위한 친숙한 React 후크 API를 제공합니다. 피드, 댓글, 작성자 프로필 가져오기, 계정 관리, 콘텐츠 게시, 커뮤니티 구독 등을 모두 중앙 서버에 의존하지 않고 처리합니다.

이 라이브러리는 [5chan](/apps/5chan/) 및 기타 Bitsocial 클라이언트 애플리케이션에서 사용되는 기본 인터페이스입니다.

:::note
`bitsocial-react-hooks`는 현재 npm에 게시되지 않고 GitHub에서 직접 사용됩니다.
:::

## 설치

패키지가 아직 npm에 없기 때문에 GitHub에서 직접 설치하고 특정 커밋 해시에 고정하세요.

```bash
yarn add https://github.com/bitsocialnet/bitsocial-react-hooks.git#<commit-hash>
```

`<commit-hash>`를 대상으로 삼으려는 커밋으로 바꾸세요.

## API 개요

후크는 기능적 범주로 구성됩니다. 다음은 각 카테고리에서 가장 일반적으로 사용되는 후크를 요약한 것입니다. 전체 서명, 매개변수 및 반환 유형은 [GitHub의 전체 API 참조](https://github.com/bitsocialnet/bitsocial-react-hooks).)를 참조하세요.

### 계정

로컬 사용자 계정, ID 및 설정을 관리합니다.

- `useAccount(accountName?)` -- 활성(또는 명명된) 계정 객체를 반환합니다.
- `useAccounts()` -- 로컬에 저장된 모든 계정을 반환합니다.
- `useAccountComments(options?)` -- 활성 계정에서 게시한 댓글을 반환합니다.

### 댓글

개별 댓글 및 스레드를 가져와서 상호 작용합니다.

- `useComment(commentCid?)` -- CID로 단일 댓글을 가져옵니다.
- `useComments(commentCids?)` -- 여러 댓글을 일괄적으로 가져옵니다.
- `useEditedComment(comment?)` -- 주석의 최신 편집 버전을 반환합니다.

### 커뮤니티

커뮤니티 메타데이터 및 설정을 검색합니다.

- 단일 커뮤니티 조회 후크 - 주소로 커뮤니티를 가져옵니다.
- 다중 커뮤니티 조회 후크 - 여러 커뮤니티를 가져옵니다.
- 커뮤니티 통계 후크 - 구독자 및 게시물 수를 반환합니다.

### 저자

작성자 프로필과 메타데이터를 찾아보세요.

- `useAuthor(authorAddress?)` -- 작성자 프로필을 가져옵니다.
- `useAuthorComments(options?)` -- 특정 작성자의 설명을 반환합니다.
- `useResolvedAuthorAddress(authorAddress?)` -- 사람이 읽을 수 있는 주소(예: ENS)를 해당 프로토콜 주소로 확인합니다.

### 피드

콘텐츠 피드를 구독하고 페이지를 매깁니다.

- `useFeed(options?)` -- 하나 이상의 커뮤니티에서 페이지가 매겨진 게시물 피드를 반환합니다.
- `useBufferedFeeds(feedOptions?)` -- 더 빠른 렌더링을 위해 여러 피드를 사전 버퍼링합니다.
- `useAuthorFeed(authorAddress?)` -- 특정 작성자의 게시물 피드를 반환합니다.

### 작업

콘텐츠를 게시하고 쓰기 작업을 수행합니다.

- `usePublishComment(options?)` -- 새 댓글 또는 답글 게시
- `usePublishVote(options?)` -- 찬성 또는 반대 투표
- `useSubscribe(options?)` -- 커뮤니티 구독 또는 구독 취소

### 상태 및 RPC

연결 상태를 모니터링하고 원격 Bitsocial 데몬과 상호 작용합니다.

- `useClientsStates(options?)` -- IPFS/pubsub 클라이언트의 연결 상태를 반환합니다.
- RPC 설정 후크 - 현재 RPC 데몬 구성을 반환합니다.

## 개발

후크 라이브러리를 로컬에서 작업하려면 다음을 수행하세요.

**전제 조건:** Node.js, Corepack 활성화, Yarn 4

```bash
git clone https://github.com/bitsocialnet/bitsocial-react-hooks.git
cd bitsocial-react-hooks
corepack enable
yarn install
```

테스트 및 빌드 명령은 저장소 README를 참조하세요.

## 링크

- **GitHub:** [bitsocialnet/bitsocial-react-hooks](https://github.com/bitsocialnet/bitsocial-react-hooks)
- **라이센스:** GPL-2.0 전용
