window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
    { handler: "throw", matchMessage: "Ember.required is deprecated as its behavior is inconsistent and unreliable." }
  ]
};
