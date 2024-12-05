import React, { useEffect, useState } from "react";
import { View, Text, Alert, StyleSheet, ScrollView, FlatList } from "react-native";
import { BarChart, PieChart, LineChart } from "react-native-chart-kit";
import axios from "axios";
import TaskCard from "../../components/TaskCard";
import { useNavigation } from "@react-navigation/native";

const getChartData = (tasks: Task[]) => {
  const complexidade: { baixa: number; media: number; alta: number } = { baixa: 0, media: 0, alta: 0 };
  const depreciacao: Record<string, number> = {};
  const qualidade: { ruim: number; boa: number; excelente: number } = { ruim: 0, boa: 0, excelente: 0 };
  const sustentabilidade: { sim: number; nao: number } = { sim: 0, nao: 0 };

  if (!Array.isArray(tasks)) {
    console.error("tasks não é um array:", tasks);
    return null;
  }

  tasks.forEach((task) => {
    if (task.complexidade && ["baixa", "media", "alta"].includes(task.complexidade.toLowerCase())) {
      complexidade[task.complexidade.toLowerCase()]++;
    }
    if (typeof task.depreciacao === "number") {
      const key = task.depreciacao.toString();
      depreciacao[key] = (depreciacao[key] || 0) + 1;
    }
    if (task.qualidade && ["ruim", "boa", "excelente"].includes(task.qualidade.toLowerCase())) {
      qualidade[task.qualidade.toLowerCase()]++;
    }
    if (task.sustentabilidade && ["sim", "nao"].includes(task.sustentabilidade.toLowerCase())) {
      const key = task.sustentabilidade.toLowerCase() as "sim" | "nao";
      sustentabilidade[key]++;
    }
  });

  return {
    complexidade: {
      labels: ["Baixa", "Média", "Alta"],
      datasets: [{ data: [complexidade.baixa, complexidade.media, complexidade.alta] }],
    },
    depreciacao: {
      labels: Object.keys(depreciacao),
      datasets: [{ data: Object.values(depreciacao) }],
    },
    qualidade: {
      labels: ["Ruim", "Boa", "Excelente"],
      datasets: [{ data: [qualidade.ruim, qualidade.boa, qualidade.excelente] }],
    },
    sustentabilidade: [
      {
        name: "Sim",
        population: sustentabilidade.sim || 0,
        color: "#2ECC71",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Não",
        population: sustentabilidade.nao || 0, 
        color: "#E74C3C", 
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
    ],
  };
};

const DashboardScreen = () => {
  const [data, setData] = useState([]);
  const [urgencias, setUrgencias] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http:/10.0.2.2:3000/tasks");
        const allTasks = response.data;

        const urgentTasks = allTasks.filter(
          (task: Task) => task.status && task.status.toLowerCase() === "urgente"
        );
        setUrgencias(urgentTasks);

        setData(allTasks);
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar os dados do Dashboard.");
      }
    };

    fetchData();
  }, []);
  
  const tarefasUrgentes = urgencias.length > 0 ? urgencias : [];

  const chartData = data.length > 0 ? getChartData(data) : null;

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Dashboard</Text>
            <Text style={styles.subtitle}>Tarefas Urgentes</Text>
          </>
        }
        data={tarefasUrgentes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskCard
            id={item.id}
            title={item.titulo}
            dataCreated={item.dataCadastro}
            company={item.empresa || "Sem Empresa"}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.subtitle}>Nenhuma tarefa urgente encontrada</Text>
        }
        ListFooterComponent={
          <>
            <View style={styles.generalBox}>
              <Text style={styles.generalTitle}>Quadro Geral</Text>
            </View>
  
            {chartData ? (
              <>
                <View style={styles.chartContainer}>
              <Text style={styles.subtitle}>Complexidade</Text>
              <BarChart
                data={chartData.complexidade}
                width={300}
                height={220}
                chartConfig={chartConfig}
                style={styles.chart}
              />
            </View>

            <View style={styles.chartContainer}>
              <Text style={styles.subtitle}>Depreciação</Text>
              <BarChart
                data={chartData.depreciacao}
                width={300}
                height={220}
                chartConfig={chartConfig}
                style={styles.chart}
              />
            </View>

            <View style={styles.chartContainer}>
              <Text style={styles.subtitle}>Qualidade</Text>
              <BarChart
                data={chartData.qualidade}
                width={300}
                height={220}
                chartConfig={chartConfig}
                style={styles.chart}
              />
            </View>

            <View style={styles.chartContainer}>
              <Text style={styles.subtitle}>Sustentabilidade</Text>
              {chartData?.sustentabilidade && (
                <PieChart
                  data={chartData.sustentabilidade}
                  width={300} 
                  height={220} 
                  chartConfig={{
                    backgroundColor: "transparent",
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  }}
                  accessor={"population"} 
                  backgroundColor={"transparent"}
                  paddingLeft={"15"}
                  absolute 
                />
              )}
            </View>


              </>
            ) : (
              <Text style={styles.subtitle}>Carregando dados do gráfico...</Text>
            )}
          </>
        }
      />
    </View>
  );  
};

const chartConfig = {
  backgroundColor: "#535353",
  backgroundGradientFrom: "#6e6e6e",
  backgroundGradientTo: "#2476c4",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#f30404",
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 5,
    textAlign: "center",
  },
  chartContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  chart: {
    borderRadius: 16,
  },
  generalBox: {
    backgroundColor: "#2476c4",
    borderRadius: 12,
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 5, 
  },
    generalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default DashboardScreen;
