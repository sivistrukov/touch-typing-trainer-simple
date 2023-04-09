import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import TouchTypingTrainer from "./components/touch_typing_trainer/TouchTypingTrainer";

function App() {

    return (<div className={"App"}>
        <Header/>
        <main className={"App-main"}>
            <TouchTypingTrainer
                lessonText={'orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'}
                maxTime={-1}
            />
        </main>
        <Footer/>
    </div>);
}

export default App;
