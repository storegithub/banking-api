import { SelectItem } from "src/models/selectitem";

export class TemplateHelper
{
    public static templates: SelectItem<string, string>[] = [
        { 
            value: "AuthorizationTemplate",
            text: `<div>

            <style>
            .email-label
                {
                    text-align: left;
                    padding-top: 2vh !important;
                }
            </style>
            <div class="body-color body">
            <div class="body-container">
                <div class="row email-label">
                <div class="col-sm-4 col-md-4"><b></b> Codul dvs de autorizare este:</div>
                <div class="col-sm-4 col-md-4">{{model.code}}</div>
                <div class="col-sm-4 col-md-4"></div>
                </div>
            </div>
            </div>
            
            </div>`
        },
        {value: "RegistrationTemplate",
        text: `<div>

        <style>
        .email-label
            {
                text-align: left;
                padding-top: 2vh !important;
            }
        </style>
        <div class="body-color body">
        <div class="body-container">
            <div class="row email-label">
            <div class="col-sm-4 col-md-4"><b></b> Pentru confirmare accesati link-ul:</div>
            <div class="col-sm-4 col-md-4">{{model.code}}</div>
            <div class="col-sm-4 col-md-4"></div>
            </div>
        </div>
        </div>
        
        </div>`},
        {
            value: "ChangePasswordTemplate",
            text: `<div>

            <style>
            .email-label
                {
                    text-align: left;
                    padding-top: 2vh !important;
                }
            </style>
            <div class="body-color body">
            <div class="body-container">
                <div class="row email-label">
                <div class="col-sm-4 col-md-4"><b></b> Pentru resetare parola accesati link-ul:</div>
                <div class="col-sm-4 col-md-4">{{model.code}}</div>
                <div class="col-sm-4 col-md-4"></div>
                </div>
            </div>
            </div>
            
            </div>`
        }
    ];

    public static parseTemplate(templateName: string, data: SelectItem<string, string>[]) : string
    {
        const currentTemplate: string = data.find(x => x.value == templateName).text;
        let newTemplate: string = currentTemplate;
        for(var item of data)
        {
            newTemplate = currentTemplate.replace("{{"+item.value+"}}", item.text);
        }
        return newTemplate;
    }
}