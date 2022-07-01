import $ from 'jquery';

export const validateUserAndGroup = (users, groups) => {

    return users, groups;
};

export const validatePDFData = (data) => {
    
    let arrData = [];
    let strData = convertDataToString(data);
    let edittorData = covertStringToArray(strData);
    
    $.each(edittorData, function (i, field) {
        let type = getFieldType(field);
        if (type !== null) {
            let content = getFieldData(field, type);
            let jsonObject = {};

            jsonObject["type"] = type;
            jsonObject["content"] = content;
            arrData.push(jsonObject);
            console.log(jsonObject);
        }
    });
    let listData = {
        listData: arrData
    };

    console.log("Validate Data: ", listData)
    return listData;
};

let convertParagraphData = function (data) {
    return $("<div/>")
        .html(data)
        .text();
};

let convertImageData = function (data) {
    return $(data)
        .find("img:first")
        .attr("src");
};

let convertTableData = function (data) {
    let table = [];

    $(data).find("tr").each(function (element, data) {
        let row = [];
        $(this).find("td").each(function (element, data) {
            row.push(data.innerText);
        });
        table.push(row);
    });

    return JSON.stringify(table);
};

let getFieldType = function (data) {
    if (data.indexOf("</p>") !== -1 && data.indexOf('class="table"') === -1) {
        return "paragraph";
    } else if (data.indexOf('class="image"') !== -1) {
        return "image";
    } else if (data.indexOf('class="table"') !== -1) {
        return "table";
    } else {
        return null;
    }
};

let getFieldData = function (data, type) {
    if (type === "paragraph") {
        return convertParagraphData(data);
    } else if (type === "image") {
        return convertImageData(data);
    } else {
        return convertTableData(data);
    }
};

let convertDataToString = function (data) {
    function changeData(match) {
        let result = "";
        $(match)
            .find("td")
            .each(function (i, data1) {
                if ($(data1).find("p").length > 0) {
                    let content = "";
                    $(data1)
                        .find("p")
                        .each(function (j, data2) {
                            content += $("<div/>")
                                .html(data2)
                                .text();
                        });
                    result += "<td>" + content + "</td>";
                } else {
                    result += $(data1).prop("outerHTML");
                }
            });
        return "<tr>" + result + "</tr>";
    }
    const regex = /<(!?tr)>.*?<\/(!?tr)>/g;
    return data.replace(regex, changeData);
};

let removeParagraphTag = function (string) {
    const regex = /<\/*p>/g;
    return string.replace(regex, "");
};

let convertCharBreak = function (string) {
    const regex = /\%0A/g;
    return string.replace(regex, "");
};

let covertStringToArray = function (string) {
    const regex = /<([a-z]+)*[^/]*?>.*?<\/(!?p|!?figure)>/g;
    return string.match(regex);
};