import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {PaperProvider} from 'react-native-paper'

import { ScreenApp } from "./src/ScreenApp";

function App(){
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}> 
      <PaperProvider>
        <ScreenApp/>
      </PaperProvider>
    </QueryClientProvider>
  );
}

export default App;