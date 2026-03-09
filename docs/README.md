# Landing Page — ImpactTrack

## Como usar

### Vídeo do YouTube
1. Abra `index.html`.
2. Encontre a linha do iframe: `src="https://www.youtube.com/embed/VIDEO_ID?rel=0"`.
3. Substitua `VIDEO_ID` pelo ID do seu vídeo (ex.: em `https://www.youtube.com/watch?v=abc123`, o ID é `abc123`).

### Imagens da galeria
Coloque 3 imagens na pasta `images/` com os nomes:
- `screenshot1.png`
- `screenshot2.png`
- `screenshot3.png`

Ou edite os `src` no `index.html` na seção "Galeria do app" para apontar para os arquivos que você usar.

## Rodar localmente
Abra o `index.html` no navegador ou use um servidor estático, por exemplo:
```bash
npx serve .
```
