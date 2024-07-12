const btn = document.querySelector('.talk');
const content = document.querySelector('.content');
function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var date = new Date();
    var hour = date.getHours();

    if (hour >= 0 && hour < 12) {
        falar("em que posso te auxiliar hoje?");
    } else if (hour >= 12 && hour < 17) {
        falar("em que posso te auxiliar hoje?");
    } else {
        falar("em que posso te auxiliar hoje?");
    }
}

window.addEventListener('load', () => {
    speak("Meu nome é Katty...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();


recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Te ouvindo...";
    recognition.start();
});

function takeCommand(mensagem) {
    if (mensagem.includes('Oi')) {
            speak("Olá! Como eu posso te ajudar hoje?");
    } else if (mensagem.includes("google")) {
            window.open("https://google.com", "_blank");
            speak("Abrindo o Google...");
    } else if (mensagem.includes("youtube")) {
            window.open("https://youtube.com", "_blank");
            speak("Abrindo o Youtube...");
    } else if (mensagem.includes("Whatsapp")) {
            window.open("https://www.whatsapp.com", "_blank");
            speak("Abrindo o Whatsapp...");
    } else if (mensagem.match(/^(O que é|Quem é|O que são|Como é|Qual é|Quais são)/)) {
            window.open(`https://www.google.com/search?q=${mensagem.replace(" ", "+")}`, "_blank");
            const textoFinal = "Foi isso que encontrei em minha pesquisa sobre " + mensagem;
            speak(textoFinal);
    } else if (mensagem.match(/^(wikipedia | Pesquisar)/)) {
            window.open(`https://en.wikipedia.org/wiki/${mensagem.replace("wikipedia", "").trim()}`, "_blank");
            const textoFinal = "Isso foi o que eu encontrei na wikipédia" + mensagem;
            speak(textoFinal);
    } else if (mensagem.includes('hora')) {
            const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
            const textoFinal = "A hora atual é " + time;
            speak(textoFinal);
    } else if (mensagem.includes('data') || mensagem.includes("Dia")) {
            const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
            const textoFinal = "Hoje é dia" + date;
            speak(textoFinal);
    } else if (mensagem.includes('abra a calculadora')) {
            window.open('Calculator:///');
            const textoFinal = "Abrindo a calculadora";
            speak(textoFinal);
    } else {
            window.open(`https://www.google.com/search?q=${mensagem.replace(" ", "+")}`, "_blank");
            const finalText = "Encontrei algumas informações para " + mensagem + " no Google";
            speak(finalText);
    }
}

//window.open('youtube.com');