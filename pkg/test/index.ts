import { importTypes } from '@rancher/auto-import';
import {
  IPlugin,
  ActionLocation,
  PanelLocation,
  TabLocation,
  CardLocation,
  TableColumnLocation,
  ActionOpts,
} from '@shell/core/types';


var InternalIP = "127.0.0.1"
// Init the package
export default function(plugin: IPlugin) {
  // Auto-import model, detail, edit from the folders
  importTypes(plugin);

  // Provide plugin metadata from package.json
  plugin.metadata = require('./package.json');

  // Load a product
  // plugin.addProduct(require('./product'));

  // HEADER ACTION - GLOBAL

  // ADD A COL TO A TABLE
  plugin.addTableColumn(
    TableColumnLocation.RESOURCE,
    { resource: ['node'] },
    {
      name:     'some-prop-col',
      labelKey: 'onetouch Url',
      getValue: (row: any) => {
        console.log(row)
        InternalIP = row.status.addresses[0].address+":30003";
        return {url: "http://" + row.status.addresses[0].address+":30003"};
      },
      formatter: 'Link',
      formatterOpts: {
        label: 'onetouch',
        // urlKey: "http://www.baidu.com",
        // target: "http://www.baidu.com",
        // options: {
        //   href: "http://www.baidu.com",
        //   urlKey: 'http://www.baidu.com',
        //   target: "http://www.baidu.com",
        //   rel: "http://www.baidu.com"
        // } 
      }, 
    }
  );
}

export const ONETOUCHURL = {
  name: 'OneTouchURL',
  label: 'OneTouchURL',

  value: (row: any) => {
    
    const internalExternalIP = row.internalIp;
    return internalExternalIP + ":30003";
  },
  formatter: 'LinkToURL',
  formatterOpts: { 

    options: { 
      internal: true,
      target: '_blank',

    } 
  }, 

}