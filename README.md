# Pariksha Project

This is an angular project .
Start this project using "npm start".

## Dependency 

Angular material
firebase
ngrx

## Learning outcomes

1. Learnt about ngrx store and state management and implemented it in this project.

## Key Points

1. Login through any email ID and password . There is no validation on the same.
2. App to be run in production mode.

## Functionalites 

1. New workflows can be created.
2. Old workflows can  be edited.
3. Nodes as editable at all times.
4. Nodes can be deleted or added in sequential manner.
5. Status of the nodes can be changed at all times 
	a. Nodes can be moved to Completed state only in the same sequential order as they are present in the workflow. 
	b. If a previous node is marked anything but complete after they are completed, the nodes ahead of it will be marked as pending automatically.
6. Status of the workflow can only be changed if all nodes are complete. (Status of the workflow is not saved after you toggle it. By default it will be in pending state)
7. The project has been hosted on "https://pariksha-pro.web.app/" but the development version is hosted here.
8. Workflows can be searched by name and filtered on the basis of stage.

## Validations

1. Nodes cannot be empty
2. Login Information cannot be empty
3. Workflow name cannot be empty 

## Testing outcomes

1. There is a issue of object immutability in developemnt mode and not in production mode. Looking into this currently .

## Functionalites not implemented yet 

1. Shuffle of nodes when the workflow is completed. (Didn't get time to implement it )
