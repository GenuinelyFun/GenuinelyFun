import { Panel } from '../feetJsonDataInterface.ts';
import { sheetTranslateType, SheetValueType } from './utils.ts';

export const mapSummaryToExcel = (
  panels: Panel[],
  sheetTranslate: sheetTranslateType
): { [key: string]: SheetValueType }[] => {
  const allLoopTypes: string[] = [];
  const allBoardTypes: string[] = ['IOC', 'OCA'];
  const allDeviceTypes: string[] = [];
  panels.forEach((panel) => {
    panel.loop_controllers.forEach((loopController) => {
      if (
        allLoopTypes.find((item) => item === loopController.type) === undefined
      ) {
        allLoopTypes.push(loopController.type);
      }
      loopController.loops.forEach((loop) => {
        loop.addresses.forEach((device) => {
          const deviceType =
            sheetTranslate(device.type) + ', ' + device.protocol_type;
          if (
            allDeviceTypes.find((item) => item === deviceType) === undefined
          ) {
            allDeviceTypes.push(deviceType);
          }
        });
      });
    });
  });
  return panels.map((panel) => {
    const loopTypes: { [key: string]: number } = {};
    allLoopTypes.forEach((loopType) => {
      const groupedLoopTypes = Object.groupBy(
        panel.loop_controllers,
        (loopController) => loopController.type
      );
      if (groupedLoopTypes[loopType]) {
        loopTypes[loopType] = groupedLoopTypes[loopType].length;
      } else {
        loopTypes[loopType] = 0;
      }
    });

    const boardTypes: { [key: string]: number } = {};
    allBoardTypes.forEach((boardType) => {
      const groupedBoardTypes = Object.groupBy(
        panel.input_output_units,
        (board) => board.type
      );
      if (groupedBoardTypes[boardType]) {
        boardTypes[boardType] = groupedBoardTypes[boardType].length;
      } else {
        boardTypes[boardType] = 0;
      }
    });

    const deviceTypes: { [key: string]: number } = {};
    panel.loop_controllers.forEach((loopController) => {
      loopController.loops.forEach((loop) => {
        loop.addresses.forEach((device) => {
          const deviceType =
            sheetTranslate(device.type) + ', ' + device.protocol_type;
          if (deviceTypes[deviceType]) {
            deviceTypes[deviceType]++;
          } else {
            deviceTypes[deviceType] = 1;
          }
        });
      });
    });

    allDeviceTypes.forEach((deviceType) => {
      if (deviceTypes[deviceType] === undefined) {
        deviceTypes[deviceType] = 0;
      }
    });

    return {
      'Panel Number': panel.number,
      'Panel Name': panel.name,
      'Fire Expert ID': panel.uuid,
      ...loopTypes,
      ...boardTypes,
      ...deviceTypes,
    };
  });
};
