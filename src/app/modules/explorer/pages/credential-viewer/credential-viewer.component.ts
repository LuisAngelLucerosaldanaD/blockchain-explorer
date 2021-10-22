import {Component, OnDestroy, OnInit} from '@angular/core';
import {dataTest} from "@app/utils/constants/test";
import {Subscription} from "rxjs";
import {ExplorerService} from "@app/modules/explorer/service/explorer/explorer.service";
import {Credential} from "@app/modules/explorer/models/explorer/explorer.model";
import {getTokenUser, validToken} from "@app/utils/validations/validations";
import {decryptText} from "@app/utils/crypto/crypto";
import {DropdownModel} from "ecapture-ng-ui";

@Component({
  selector: 'app-credential-viewer',
  templateUrl: './credential-viewer.component.html',
  styleUrls: ['./credential-viewer.component.scss']
})
export class CredentialViewerComponent implements OnInit, OnDestroy {

  private _subscription = new Subscription();

  public test: string = dataTest;
  public sec1: boolean = true;
  public documentSelected: string = '';

  public credential: Credential = {description: "", files: [], identifiers: [], name: ""};
  private readonly token: string;
  private readonly dataToken: any;
  private key: string = '';
  public isBlockPage: boolean;
  public ecDropFile: DropdownModel;
  public isError: boolean = false;
  public isValidToken: boolean = true;

  constructor(
    private _explorerService: ExplorerService
  ) {
    this.ecDropFile = {
      alert: {
        info: {
          font: '',
          color: 'text-white',
          label: '',
          size: 'text-base'
        },
        error: {
          font: '',
          color: 'text-white',
          label: '',
          size: 'text-base'
        },
        success: {
          font: '',
          color: 'text-white',
          label: '',
          size: 'text-base'
        },
        warning: {
          font: '',
          color: 'text-white',
          label: '',
          size: 'text-base'
        },
      },
      icon: {
        color: 'text-white',
        name: 'caret down',
        position: '',
        active: true
      },
      headerLabel: {
        label: '',
        color: 'text-outline-gray-3',
        font: '',
        size: ''
      },
      placeholder: {
        label: 'Anexos',
        color: 'text-outline-gray-3',
        font: '',
        size: ''
      },
      error: false,
      container: {
        background: 'bg-container-gray-1',
        border: {
          color: 'border-container-gray-1',
          size: 'border-4',
          round: 'rounded-lg',
          style: 'border-solid',
          hover: 'border-outline-gray-4'
        }
      },
      filter: false,
      data: [],
      optional: false,
      optionLabel: 'label',
      optionContainer: {
        background: 'bg-container-gray-1 z-50',
        border: {
          color: 'border-outline-gray-4',
          size: 'border-2',
          round: 'rounded',
          style: 'border-solid',
          hover: 'bg-outline-gray-4'
        }
      },
    };
    this.isBlockPage = true;
    this.token = this.getUrlParams();
    if (this.token !== '') {
      if (!validToken(this.token)) {
        this.dataToken = getTokenUser(this.token);
        this._subscription.add(
          this._explorerService.getAppId().subscribe(
            (res) => {
              if (res.error) {
                console.log(res.msg);
              } else {
                this.key = atob(res.data);
                this.getTransaction(this.dataToken.credential.transaction_id, this.dataToken.credential.block);
              }
            },
            (err: Error) => {
              console.log(err.message);
            }
          )
        );
      } else {
        this.isValidToken = false;
        this.isError = true;
        this.isBlockPage =false;
      }
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private getTransaction(transactionId: string, blockId: number): void {
    this._subscription.add(
      this._explorerService.getTransactionOfCredential(transactionId, blockId).subscribe(
        (res) => {
          if (res.error) {
            console.log(res.msg);
            this.isError = true;
          } else {
            if (res.data) {
              this.credential = JSON.parse(decryptText(res.data.data, '204812730425442A472D2F423F452847'));
              for (const item of this.credential.files) {
                this.ecDropFile.data?.push({label: item.name, value: item.file_encode});
              }
              if (this.credential.files.length) {
                this.documentSelected = this.credential.files[0].file_encode;
                this.ecDropFile.placeholder.label = this.credential.files[0].name;
              }
            }
          }
          this.isBlockPage = false;
        },
        (err: Error) => {
          console.log(err.message);
          this.isError = true;
        }
      )
    );
  }

  public validateData(position: number): boolean {
    for (let item of this.credential.identifiers[position].attributes) {
      if (!!this.dataToken.credential.attributes_id.find((key: any) => key === item.id)) return true;
    }
    return false;
  }

  public validateAttributes(id: number): boolean {
    return !!this.dataToken.credential.attributes_id.find((key: any) => key === id);
  }

  public validateFileData(): boolean {
    for (let item of this.credential.files) {
      if (!!this.dataToken.credential.files_id.find((key: any) => key === item.id_file)) return true;
    }
    return false;
  }

  private getUrlParams(): string {
    const urlData = new URL(document.location.toString());
    const ObjectToken = urlData.searchParams.get('token');
    if (ObjectToken !== '' && ObjectToken) {
      sessionStorage.setItem('Token', ObjectToken);
    }
    return ObjectToken || '';
  }
}
