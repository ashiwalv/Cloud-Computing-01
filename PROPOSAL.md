
# Micro-Services Based Dashboard for a Modular Factory
A modular factory is a network of decoupled and independent automation components. These automation components can range from a singular unit such as motors, valves or sensors to complex production units such as packaging stations, pick and place units, or robotic arms. A modular factory enables flexible and adaptable manufacturing processes.

The auto-integration of new automation components in the production network and auto/semi reconfiguration of the manufacturing systems are major issues in the realization of a modular factory. Various approaches are proposed in the literature to build a modular factory, but there is a lack of practical approaches. This project demonstrates the use of micro-services architecture to develop a dashboard display for a modular factory. A dashboard is used to provide process monitoring and system-wide overview. 

In this project, a design of a modular factory is proposed based on micro-service architecture. In the demo, three dummy production modules will be developed. The OPC UA servers will provide the information models of the modules. These information models will be used by Display Managers to integrate and reconfigure the dashboard display. Display manager offers life-cycle management of dashboard and OPC UA client applications. The OPC UA client applications will provide data exchange and connection management services to the Display Manager application.

A Local Discovery Server (LDS) is implemented to support the auto-discovery and registration of automation modules.

The Kubernetes is proposed as the platform to deploy and manage the independent applications running as micro-services. These micro-services will be developed and deployed in dedicated containers. Which enables faster and decoupled developments of modules. 

### Overall conceptual diagram
<img src="https://user-images.githubusercontent.com/3264554/101938469-a7935e00-3be3-11eb-9a45-65e6ec0cd36e.JPG" width=70% height=70%>


## Objectives

1. Implementation of interfaces and information models for the mock-up production modules hosted on OPC UA servers.
2. Implementation of automatic discovery of production modules
3. Automating the OPC UA client application deployment for respective production modules in the platform
4. Development of Display manager for the dashboard application
5. Demonstration of the proposed solution in the final presentation
   
## Deliverables

1. Documentation of the project in a report format
2. Presentation of the demo application

## General Steps

Since we going to use git for code base and Travis for CI the following steps are wished to be accomplished:

1. Define a docker file for application build
2. Run the app on the docker hub
3. Run multiple tests against the build
4. Load balancing the application using Kubernetes (scale)

it is an open decision to make if the docker hub host is either be local or services like google cloud, AWS, Azure, docker hub, etc.  





