export default {
	//공통코드
	hardwareTypes: [],
	fileStorageTypes: [],
	enduranceIops: [],
	classificationTypes: [],
	environmentTypes: [],
	
	//원가견적 기준정보
	general: {},		//기준정보 상세
	generalHistory: [],	//기준정보 history
	generalHistoryDetail: {},
	vm: {vms: []},		
	vmHistory: [],		
	vmHistoryDetail: {vms: []},
	storage: {fileStorages: []},
	storageHistory: [],
	storageHistoryDetail: {fileStorages: []},
	
	products: [],
	productMspCost: {},
	productMspCostHistory: [],
	productMspCostHistoryDetail: {},
	
	//원가견적 템플릿
	costEstimateTemplate: {},
	
	//프로젝트 원가견적
	projects: [],
	project: {},
	projectVolume: {},
	projectCostEstimate: {	//편집중인 원가견적
  		environments: [],
  		summary: {environments: []}
	},
	productReferences: [],	//product addon-service & estimate template
	projectCostEstimateHistory: [],
	projectCostEstimateHistoryDetailStatus: false,
	projectCostEstimateHistoryDetail: {},
	customers: []
	
}