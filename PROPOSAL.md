
# Micro-Services Based Dashboard for a Modular Factory
A modular factory is a network of decoupled and independent automation components. These automation components can range from a singular unit such as motors, valves or sensors to complex production units such as packaging stations, pick and place units, or robotic arms. A modular factory enables flexible and adaptable manufacturing processes.

The auto-integration of new automation components in the production network and auto/semi reconfiguration of the manufacturing systems are major issues in the realization of a modular factory. Various approaches are proposed in the literature to build a modular factory, but there is a lack of practical approaches. This project demonstrates the use of micro-services architecture to develop a dashboard display for a modular factory. A dashboard is used to provide process monitoring and system-wide overview. 

In this project, a design of a modular factory is proposed based on micro-service architecture. In the demo, three dummy production modules will be developed. The OPC UA servers will provide the information models of the modules. These information models will be used by Display Managers to integrate and reconfigure the dashboard display. Display manager offers life-cycle management of dashboard and OPC UA client applications. The OPC UA client applications will provide data exchange and connection management services to the Display Manager application.

A Local Discovery Server (LDS) is implemented to support the auto-discovery and registration of automation modules.

The Kubernetes is proposed as the platform to deploy and manage the independent applications running as micro-services. These micro-services will be developed and deployed in dedicated containers. Which enables faster and decoupled developments of modules. 

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

1. Kubernetes Platform is started
2. In the Kubernetes Platform a Cluster of Modular Factory is Started
3. In the Cluster, three Pods are started which are: LDS_Server, Display_Manager, Dashboard in two Nodes (as seen in the image)

![1](https://user-images.githubusercontent.com/3264554/102824835-dd072b00-43dd-11eb-9b1c-6f7341deab8c.png)

4. Starting of Machine-1's Pod (A TemperatureSensorModule) is requested to API Server of Ctrl Plane

![3](https://user-images.githubusercontent.com/3264554/102827018-1a6db780-43e2-11eb-9857-3210f395ef4d.png)

5. Machine-1's Pod Register itself on LDS_Server
6. LDS_Server sends the endpoints of the new Machine-1's Pod to Display_Manager, 
7. Display_Manager sends a request to Display_Manager to start  a Machine-1_OPC_UA_Client's Pod with the endpoints
8. Scheduler schedule the new Pod at Node 3 and Kublet starts it.

![2](https://user-images.githubusercontent.com/3264554/102827012-1772c700-43e2-11eb-8c30-53f117ca0997.png)

9. Machine-1_OPC_UA_Client's Pod establishes the connection with Machine-1's Pod and starts OPC UA communication
10. Machine-1_OPC_UA_Client's Pod forwards the data from Machine-1's Pod to Display_Manager.
11. Display_Manager sends the request to Dashboard to add Machine-1's visualization at the Display_Manager
12. Dashboard displays visualization of Machine_1 (In this case Visualization of Temperature sensor)


it is an open decision to make if the docker hub host is either be local or services like google cloud, AWS, Azure, docker hub, etc.  





