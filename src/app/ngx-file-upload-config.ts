import { FileInputConfig } from 'ngx-material-file-input/lib/model/file-input-config.model';


export const NgxMaterialConfig: FileInputConfig = {
    sizeUnit: 'Octet'
  };

  // add with module injection in app.module
  /* providers: [{ provide: NGX_MAT_FILE_INPUT_CONFIG, useValue: config }]; */
