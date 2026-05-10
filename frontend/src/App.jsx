import { useState } from "react";
import axios from "axios";

import {
  Layout,
  Form,
  Input,
  Select,
  Radio,
  Button,
  Card,
  Typography,
} from "antd";

import "antd/dist/reset.css";

const { Header, Content, Sider } = Layout;
const { TextArea } = Input;
const { Title, Text } = Typography;

function App() {

  const [aiInput, setAiInput] = useState("");

  const [messages, setMessages] = useState([]);

  const [formData, setFormData] = useState({
    hcp_name: "",
    hospital: "",
    interaction_type: "",
    interaction_date: "",
    interaction_time: "",
    attendees: "",
    interaction_summary: "",
    sentiment: "",
    outcomes: "",
    follow_up_action: "",
  });

const analyzeInteraction = async () => {

  try {

    // USER MESSAGE

    const userMessage = {
      sender: "user",
      text: aiInput,
    };

    setMessages((prev) => [...prev, userMessage]);

    // API CALL

    const response = await axios.post(
      "http://127.0.0.1:8000/api/analyze",
      {
        message: aiInput,
      }
    );

    // MERGE ONLY UPDATED FIELDS

    setFormData((prev) => ({
      ...prev,
      ...response.data.result,
    }));

    // CREATE SMART AI RESPONSE

    const updates = Object.entries(response.data.result)
      .map(([key, value]) => `${key} → ${value}`)
      .join(", ");

    const aiMessage = {
      sender: "ai",
      text: `Updated: ${updates}`,
    };

    setMessages((prev) => [...prev, aiMessage]);

    // CLEAR INPUT

    setAiInput("");

  } catch (error) {

    console.log(error);
    alert("AI Analysis Failed");

  }
};

  return (
    <Layout style={{ minHeight: "100vh" }}>

      {/* HEADER */}

      <Header
        style={{
          background: "#001529",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Title style={{ color: "white", margin: 0 }} level={3}>
          AI-First CRM HCP Module
        </Title>
      </Header>

      <Layout>

        {/* LEFT SIDE */}

        <Content style={{ padding: "24px" }}>

          <Card title="Log HCP Interaction">

            <Form layout="vertical">

              <Form.Item label="HCP Name">
                <Input
                  placeholder="Enter HCP name"
                  value={formData.hcp_name}
                />
              </Form.Item>

              <Form.Item label="Hospital">
                <Input
                  placeholder="Enter hospital"
                  value={formData.hospital}
                />
              </Form.Item>

              <Form.Item label="Interaction Type">
                <Select
                  value={formData.interaction_type}
                  options={[
                    { value: "Meeting", label: "Meeting" },
                    { value: "Call", label: "Call" },
                    { value: "Email", label: "Email" },
                  ]}
                />
              </Form.Item>

              <Form.Item label="Date">
                <Input
                  placeholder="Interaction Date"
                  value={formData.interaction_date}
                />
              </Form.Item>

              <Form.Item label="Time">
                <Input
                  placeholder="Interaction Time"
                  value={formData.interaction_time}
                />
              </Form.Item>

              <Form.Item label="Attendees">
                <Input
                  placeholder="Enter attendees"
                  value={formData.attendees}
                />
              </Form.Item>

              <Form.Item label="Topics Discussed">
                <TextArea
                  rows={4}
                  value={formData.interaction_summary}
                />
              </Form.Item>

              <Form.Item label="HCP Sentiment">
                <Radio.Group value={formData.sentiment}>
                  <Radio value="Positive">Positive</Radio>
                  <Radio value="Neutral">Neutral</Radio>
                  <Radio value="Negative">Negative</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item label="Outcomes">
                <TextArea
                  rows={3}
                  value={formData.outcomes}
                />
              </Form.Item>

              <Form.Item label="Follow-up Actions">
                <TextArea
                  rows={3}
                  value={formData.follow_up_action}
                />
              </Form.Item>

{/* <Button
  type="primary"
  block
  onClick={saveInteraction}
>
  Save Interaction
</Button> */}

            </Form>

          </Card>

        </Content>

        {/* RIGHT SIDE */}

        <Sider
          width={420}
          theme="light"
          style={{
            padding: "24px",
            borderLeft: "1px solid #f0f0f0",
            background: "#fff",
          }}
        >

          <Card title="🤖 AI Assistant">

            <Text type="secondary">
              Log interaction details using conversational AI
            </Text>

            <div style={{ marginTop: "20px" }}>

              {/* CHAT AREA */}

              <div
                style={{
                  height: "400px",
                  overflowY: "auto",
                  border: "1px solid #f0f0f0",
                  padding: "12px",
                  borderRadius: "8px",
                  marginBottom: "16px",
                  background: "#fafafa",
                }}
              >

                {messages.map((msg, index) => (

                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent:
                        msg.sender === "user"
                          ? "flex-end"
                          : "flex-start",
                      marginBottom: "12px",
                    }}
                  >

                    <div
                      style={{
                        maxWidth: "80%",
                        padding: "10px 14px",
                        borderRadius: "12px",
                        background:
                          msg.sender === "user"
                            ? "#1677ff"
                            : "#f0f0f0",
                        color:
                          msg.sender === "user"
                            ? "white"
                            : "black",
                      }}
                    >
                      {msg.text}
                    </div>

                  </div>

                ))}

              </div>

              {/* INPUT */}

              <TextArea
                rows={4}
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder='Example:
"Met Dr. Sharma at Apollo Hospital yesterday at 4 PM with regional sales manager Rahul. Positive discussion about diabetes treatment adoption and requested follow-up next week."'
              />

              {/* BUTTON */}

              <Button
                type="primary"
                style={{ marginTop: "16px" }}
                block
                onClick={analyzeInteraction}
              >
                Analyze with AI
              </Button>

            </div>

          </Card>

        </Sider>

      </Layout>

    </Layout>
  );
}

export default App;