export function TopicFunction({ channels }) {
  const topicsDetails = getTopics(channels);
  let functions = '';

  topicsDetails.forEach((t) => {
    functions += `def send${t.name}(self, id):
        topic = "${t.topic}"
        self.client.publish(topic, id)\n`
  });

  return functions;
}

function getTopics(channels) {
  const channelsCanSendTo = channels;
  let topicsDetails = [];

  channelsCanSendTo.forEach((ch) => {
    const topic = {};
    const operationId = ch.operations().filterByReceive()[0].id();
    topic.name = operationId.charAt(0).toUpperCase() + operationId.slice(1);
    topic.topic = ch.address();

    topicsDetails.push(topic);
  })

  return topicsDetails;
}
