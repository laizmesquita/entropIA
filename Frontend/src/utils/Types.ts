export type TaskProps = {
    id: number;
    title: String;
    date: String;
    company: String;
    agente: String;
    status: String;
    description: string;
    complexidade: string;
    depreciacao: number;
    qualidade: string;
    sustentabilidade: string;
};

export type RootStackParamList = {
    Login: undefined;
    FormScreen: undefined;
    Home: undefined;
    Profile: undefined;
    Details: {id: number};
};