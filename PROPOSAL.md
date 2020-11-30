
# Micro-Services Based Dashboard for a Modular Factory
A modular factory is a network of decoupled and independent automation components. These automation components can range from a singular unit such as a motors, valves or sensors to complex production units suchs as packaging stations, pick and place units or robotic arms. A modular factory enables flexible and adaptable manufacturing processes.

The auto-integration of new automation components in production network and auto/semi reconfiguration of the manufacturing systems are major issues in realization of a modular factory. Various appraoches are proposed in the literature to build a modular factory, but there is lack of practical approaches. This project demonstrate the use of micro-services architecture to develop a dashboard display for a modular factory. A dashboard is used to provide process monitoring and system wide overview. 

In this project, a design of modular factory is proposed based on micro-service architecture. In the demo, three dummy production modules will be developed. The OPC UA servers will provide the information models of the modules. These information models will be used by Display Managers to integrate and reconfigure Dashboard display. Display manager offers life-cycle mangement of dashboard and OPC UA client applications. The OPC UA client applications will provide data exchange and connection management services to the Display Manager application.

A Local Discovery Server (LDS) is implemented to support the auto-discovery and registeration of automation modules.

The kubernetes is proposed as the platform to deploy and manage the indpendent applications running as micro-services. These micro-services will be developed and deployed in dedicated containers. Which enables faster and decoupled developments of modules. 

### Add figure here and remove this line

## Objectives

1. Implementation of interfaces and information models for the mock-up production modules hosted on OPC UA servers.
2. Implementation of automatic discovery of production modules
3. Automating the OPC UA client application deployment for respective production modules in the platform
4. Development of Display manager for Dashboard application
5. Demonstration of the proposed solution in final presentation
   
## Deliverables

1. Documenation of the project in a report format
2. Presentation of the demo application