import { Header } from './components/header.tsx'
import { Footer } from './components/footer.tsx'
import { LeftBoard } from './screens/LeftBoard.tsx'
import { RightBoard } from './screens/RightBoard.tsx'
import { CenterBoard } from './screens/CenterBoard.tsx'

function App() {

  return (
      <div className="h-screen flex flex-col bg-[#121212]">
        <Header />
        <div className="flex-1 flex justify-between gap-2 overflow-hidden">
          <LeftBoard/>
          <CenterBoard/>
          <RightBoard/>
        </div>
        <Footer/>
      </div>
  )
}

export default App
